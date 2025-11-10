import { useNavigate } from "react-router-dom";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Clock, 
  Camera, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ExamRules = () => {
  usePageSEO({
    title: "Exam Rules & Guidelines - Shivankhed Khurd",
    description: "Important exam rules, conduct guidelines, and instructions for online exams",
    keywords: ["exam rules", "guidelines", "instructions", "conduct", "Shivankhed Khurd"],
  });

  const navigate = useNavigate();

  const rules = [
    {
      title: "General Guidelines",
      icon: BookOpen,
      items: [
        "All students must login with their registered account before taking any exam",
        "Each exam can only be attempted once - there are no retakes",
        "Students must complete the exam within the allocated time duration",
        "The exam will auto-submit when time expires",
        "Ensure stable internet connection throughout the exam"
      ]
    },
    {
      title: "Integrity & Conduct",
      icon: Shield,
      items: [
        "Students must accept the integrity pledge before starting the exam",
        "No external help, resources, or materials are allowed during the exam",
        "Communication with others during the exam is strictly prohibited",
        "Any form of cheating will result in disqualification",
        "Students must work independently and honestly"
      ]
    },
    {
      title: "Camera & Photo Requirements",
      icon: Camera,
      items: [
        "Camera access is required - photos will be taken at start and end of exam",
        "Ensure your face is clearly visible in the camera",
        "Photos are used for verification and security purposes only",
        "Camera must be enabled throughout the exam duration",
        "Blocking or covering the camera may result in exam cancellation"
      ]
    },
    {
      title: "Exam Timing & Duration",
      icon: Clock,
      items: [
        "Exams are available only during scheduled date and time",
        "Duration varies by exam - typically 60-90 minutes",
        "Timer starts as soon as you begin the exam",
        "Time cannot be paused once started",
        "Exam auto-submits when time runs out"
      ]
    },
    {
      title: "Question Format",
      icon: FileText,
      items: [
        "All questions are multiple choice with 4 options (A, B, C, D)",
        "Each exam typically contains 100 questions",
        "Questions are randomly selected from a larger question pool",
        "Each question has only one correct answer",
        "Unanswered questions are marked as incorrect"
      ]
    }
  ];

  const dosDonts = {
    dos: [
      "Test your internet connection before starting",
      "Find a quiet, well-lit place for taking the exam",
      "Keep your device charged or connected to power",
      "Read each question carefully before answering",
      "Review your answers before final submission"
    ],
    donts: [
      "Don't refresh the browser during the exam",
      "Don't switch tabs or open other applications",
      "Don't use any external notes or reference materials",
      "Don't communicate with others during the exam",
      "Don't wait until the last minute to submit"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/exam")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exam Dashboard
          </Button>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Exam Rules & Guidelines
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read and understand these rules carefully before taking any exam. 
              Following these guidelines ensures fair assessment for all students.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Important Notice */}
        <Card className="mb-8 border-orange-500 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
              <AlertTriangle className="h-5 w-5" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-800 dark:text-orange-200">
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>One Attempt Only:</strong> Each exam can only be attempted once. Make sure you're prepared before starting.</li>
              <li><strong>Camera Required:</strong> Your camera must be enabled for identity verification.</li>
              <li><strong>Time Bound:</strong> Once started, the timer cannot be paused. Plan accordingly.</li>
              <li><strong>Internet Required:</strong> Ensure stable internet connection throughout the exam.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Detailed Rules Sections */}
        <div className="grid gap-6 mb-8">
          {rules.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dos and Don'ts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Dos */}
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                DO's - Best Practices
              </CardTitle>
              <CardDescription>Follow these recommendations for best results</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dosDonts.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-950 p-1 rounded mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Don'ts */}
          <Card className="border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-6 w-6" />
                DON'Ts - Avoid These
              </CardTitle>
              <CardDescription>Actions that may result in exam issues</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dosDonts.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-red-100 dark:bg-red-950 p-1 rounded mt-0.5">
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Scoring Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scoring & Results</CardTitle>
            <CardDescription>How your exam will be evaluated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900 dark:text-green-100">Correct Answer</span>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Each correct answer adds to your score
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-900 dark:text-red-100">Wrong Answer</span>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    No negative marking - but counts as incorrect
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Unanswered</span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Treated as incorrect - answer all questions
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold">After Exam Completion:</h4>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Results are available immediately after submission</li>
                  <li>You can view detailed solutions with explanations</li>
                  <li>Your score appears on your dashboard and leaderboard</li>
                  <li>Review all questions to learn from mistakes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Requirements</CardTitle>
            <CardDescription>Ensure your device meets these requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Device Requirements:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Desktop</Badge>
                    <span className="text-sm">Computer or Laptop (Recommended)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Mobile</Badge>
                    <span className="text-sm">Smartphone or Tablet (Supported)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Camera</Badge>
                    <span className="text-sm">Working webcam or front camera</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Browser</Badge>
                    <span className="text-sm">Chrome, Firefox, Safari, or Edge</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Internet Connection:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Minimum 2 Mbps bandwidth recommended</li>
                  <li>• Stable connection required throughout exam</li>
                  <li>• WiFi preferred over mobile data</li>
                  <li>• Avoid downloading files during exam</li>
                  <li>• Close unnecessary applications</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Contact us if you have questions or technical issues</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">
              If you experience technical difficulties during an exam or have questions about the rules, 
              please contact the exam administrator immediately.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate("/contact")}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => navigate("/exam")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exam Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamRules;