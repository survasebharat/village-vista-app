import { useState } from 'react';
import { Phone, Mail, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MemberPopupModal from './MemberPopupModal';
import { PersonProfile } from '@/hooks/useVillageConfig';

interface PeopleSectionProps {
  title: string;
  description: string;
  people?: PersonProfile[];
  sectionId: string;
}

const PeopleSection = ({ title, description, people, sectionId }: PeopleSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!people || people.length === 0) return null;

  const handleMemberClick = (person: PersonProfile) => {
    setSelectedMember({
      name: person.name,
      image: person.image,
      role: person.profession,
      description: person.description,
      contact: person.contact,
      email: person.email,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <section id={sectionId} className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* People Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.map((person, index) => (
              <Card 
                key={`${person.name}-${index}`}
                className="card-elegant hover-lift animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleMemberClick(person)}
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-accent cursor-pointer hover:border-primary transition-colors">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardTitle className="text-lg">{person.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto text-xs">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {person.profession}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {person.description}
                  </p>
                  {person.contact && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${person.contact}`;
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {person.contact}
                    </Button>
                  )}
                  {person.email && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${person.email}`;
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {person.email}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MemberPopupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />
    </>
  );
};

export default PeopleSection;
