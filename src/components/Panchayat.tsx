import { Phone, Mail, MapPin, Clock, User, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import villageData from "@/data/villageData.json";

const Panchayat = () => {
  const { panchayat } = villageData;

  return (
    <section id="panchayat" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Panchayat Representatives
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet our elected representatives who work tirelessly for the development 
            and welfare of our village community.
          </p>
        </div>

        {/* Sarpanch Section */}
        <div className="mb-16">
          <Card className="card-elegant max-w-4xl mx-auto animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
                <img 
                  src={panchayat.sarpanch.image} 
                  alt={panchayat.sarpanch.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-3xl text-gradient mb-2">
                {panchayat.sarpanch.name}
              </CardTitle>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Sarpanch
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  {panchayat.sarpanch.education}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Tenure: {panchayat.sarpanch.tenure}</span>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
                <blockquote className="text-lg italic text-center text-foreground mb-4">
                  "{panchayat.sarpanch.message}"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {panchayat.sarpanch.contact}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {panchayat.sarpanch.email}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ward Members Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            Ward Members
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {panchayat.wardMembers.map((member, index) => (
              <Card 
                key={member.name} 
                className="card-elegant hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-accent">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {member.position}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{member.ward}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    {member.contact}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Secretary Section */}
        <div className="mb-16">
          <Card className="card-elegant max-w-2xl mx-auto animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary">
                <img 
                  src={panchayat.secretary.image} 
                  alt={panchayat.secretary.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl">{panchayat.secretary.name}</CardTitle>
              <Badge variant="secondary" className="mx-auto">
                Panchayat Secretary
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>Office Hours: {panchayat.secretary.office_hours}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {panchayat.secretary.contact}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {panchayat.secretary.email}
                </Button>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  For administrative queries, document verification, and general assistance, 
                  please contact the Panchayat Secretary during office hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            Village Staff
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {panchayat.staff.map((staff, index) => (
              <Card 
                key={staff.name} 
                className="card-elegant hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-muted">
                    <img 
                      src={staff.image} 
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{staff.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto text-xs">
                    {staff.position}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">{staff.department}</p>
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    <Phone className="h-3 w-3 mr-2" />
                    {staff.contact}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Responsibilities Section */}
        <div className="mt-16">
          <Card className="card-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Panchayat Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Water Supply & Sanitation",
                  "Road Construction & Maintenance",
                  "Primary Education",
                  "Healthcare Services",
                  "Rural Development Programs",
                  "Environmental Protection",
                  "Social Welfare Schemes",
                  "Agricultural Support",
                  "Women & Child Development",
                ].map((responsibility, index) => (
                  <div 
                    key={responsibility}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover-lift"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium">{responsibility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Panchayat;