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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* People Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.map((person, index) => (
              <Card 
                key={`${person.name}-${index}`}
                className="group card-elegant hover-lift animate-fade-in cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleMemberClick(person)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-all duration-300 shadow-lg">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {person.name}
                  </CardTitle>
                  <Badge variant="outline" className="mx-auto text-xs mt-2 border-primary/30 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {person.profession}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed px-2">
                    {person.description}
                  </p>
                  {person.contact && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
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
                      className="w-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
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
