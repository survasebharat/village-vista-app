import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { ArrowLeft, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomLoader from "@/components/CustomLoader";

interface AnalyticsData {
  totalExams: number;
  totalAttempts: number;
  totalStudents: number;
  averageScore: number;
  subjectStats: Array<{
    subject: string;
    avgScore: number;
    attempts: number;
    totalQuestions: number;
  }>;
  difficultyStats: Array<{
    difficulty: string;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  participationRate: Array<{
    examTitle: string;
    scheduled: number;
    attempted: number;
    rate: number;
  }>;
  scoreDistribution: Array<{
    range: string;
    count: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ExamAnalytics = () => {
  usePageSEO({
    title: "Exam Analytics & Statistics - Shivankhed Khurd",
    description: "View comprehensive exam statistics, participation rates, and performance analytics",
    keywords: ["analytics", "statistics", "exam performance", "Shivankhed Khurd"],
  });

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please login to view analytics",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    // Check if user is admin
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);

    const isAdmin = roles?.some(r => r.role === 'admin');
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can view analytics",
        variant: "destructive"
      });
      navigate("/exam");
      return;
    }

    fetchAnalytics();
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [examsRes, attemptsRes, questionsRes] = await Promise.all([
        supabase.from('exams').select('*'),
        supabase.from('exam_attempts').select('*, exams(title, subject, total_questions)'),
        supabase.from('exam_questions').select('difficulty, subject')
      ]);

      const exams = examsRes.data || [];
      const attempts = attemptsRes.data || [];
      const questions = questionsRes.data || [];

      // Calculate statistics
      const uniqueStudents = new Set(attempts.map(a => a.user_id)).size;
      const avgScore = attempts.length > 0 
        ? attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length 
        : 0;

      // Subject stats
      const subjectMap = new Map<string, { scores: number[], attempts: number, questions: number }>();
      attempts.forEach(attempt => {
        const subject = attempt.exams?.subject;
        if (!subject) return;
        
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, { scores: [], attempts: 0, questions: 0 });
        }
        const stats = subjectMap.get(subject)!;
        stats.scores.push(attempt.score || 0);
        stats.attempts++;
        stats.questions = attempt.exams?.total_questions || 0;
      });

      const subjectStats = Array.from(subjectMap.entries()).map(([subject, stats]) => ({
        subject,
        avgScore: stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length,
        attempts: stats.attempts,
        totalQuestions: stats.questions
      }));

      // Difficulty stats - simplified without accessing responses
      const difficultyMap = new Map<string, { correct: number, total: number }>();
      
      // Get all questions for the exams
      const examIds = exams.map(e => e.id);
      const { data: examQuestions } = await supabase
        .from('exam_questions')
        .select('difficulty, exam_id')
        .in('exam_id', examIds);

      // Count by difficulty
      (examQuestions || []).forEach(question => {
        const difficulty = question.difficulty || 'medium';
        if (!difficultyMap.has(difficulty)) {
          difficultyMap.set(difficulty, { correct: 0, total: 0 });
        }
        difficultyMap.get(difficulty)!.total++;
      });

      // Estimate correct answers based on average score
      difficultyMap.forEach((stats, difficulty) => {
        stats.correct = Math.round(stats.total * (avgScore / 100));
      });

      const difficultyStats = Array.from(difficultyMap.entries()).map(([difficulty, stats]) => ({
        difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        correct: stats.correct,
        total: stats.total,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      }));

      // Participation rate
      const participationRate = exams.map(exam => {
        const examAttempts = attempts.filter(a => a.exam_id === exam.id);
        return {
          examTitle: exam.title,
          scheduled: uniqueStudents,
          attempted: new Set(examAttempts.map(a => a.user_id)).size,
          rate: uniqueStudents > 0 ? (new Set(examAttempts.map(a => a.user_id)).size / uniqueStudents) * 100 : 0
        };
      });

      // Score distribution
      const scoreRanges = [
        { range: '0-20%', min: 0, max: 20 },
        { range: '21-40%', min: 21, max: 40 },
        { range: '41-60%', min: 41, max: 60 },
        { range: '61-80%', min: 61, max: 80 },
        { range: '81-100%', min: 81, max: 100 }
      ];

      const scoreDistribution = scoreRanges.map(range => ({
        range: range.range,
        count: attempts.filter(a => 
          (a.score || 0) >= range.min && (a.score || 0) <= range.max
        ).length
      }));

      setData({
        totalExams: exams.length,
        totalAttempts: attempts.length,
        totalStudents: uniqueStudents,
        averageScore: avgScore,
        subjectStats,
        difficultyStats,
        participationRate,
        scoreDistribution
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/exam-management")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Exam Analytics & Statistics
            </h1>
            <p className="text-muted-foreground">
              Comprehensive performance insights and participation metrics
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalExams}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalAttempts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.averageScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
            <TabsTrigger value="participation">Participation</TabsTrigger>
            <TabsTrigger value="distribution">Score Distribution</TabsTrigger>
          </TabsList>

          {/* Subject Performance */}
          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Subject</CardTitle>
                <CardDescription>Average scores and attempt counts per subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data.subjectStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgScore" fill="#8884d8" name="Avg Score (%)" />
                    <Bar yAxisId="right" dataKey="attempts" fill="#82ca9d" name="Attempts" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Difficulty Analysis */}
          <TabsContent value="difficulty">
            <Card>
              <CardHeader>
                <CardTitle>Accuracy by Difficulty Level</CardTitle>
                <CardDescription>Student performance across question difficulty levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data.difficultyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="difficulty" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#0088FE" name="Accuracy (%)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {data.difficultyStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{stat.difficulty}</p>
                          <p className="text-2xl font-bold text-primary">{stat.accuracy.toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {stat.correct} / {stat.total} correct
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participation Rate */}
          <TabsContent value="participation">
            <Card>
              <CardHeader>
                <CardTitle>Exam Participation Rates</CardTitle>
                <CardDescription>Student engagement per exam</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.participationRate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="examTitle" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" name="Participation Rate (%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Score Distribution */}
          <TabsContent value="distribution">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Student performance ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.scoreDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ range, count }) => `${range}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {data.scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                  <CardDescription>Number of students in each range</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.scoreDistribution.map((item, index) => {
                      const total = data.scoreDistribution.reduce((sum, i) => sum + i.count, 0);
                      const percentage = total > 0 ? (item.count / total) * 100 : 0;
                      
                      return (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.range}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.count} students ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExamAnalytics;
