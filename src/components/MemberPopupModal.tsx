import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Mail, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MemberPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    image: string;
    role?: string;
    position?: string;
    designation?: string;
    description?: string;
    message?: string;
    work?: string;
    contact?: string;
    email?: string;
    education?: string;
    eduacation?: string;
    department?: string;
    ward?: string;
  } | null;
}

const MemberPopupModal = ({ isOpen, onClose, member }: MemberPopupModalProps) => {
  if (!member) return null;

  const roleText = member.role || member.position || member.designation || '';
  const descriptionText = member.description || member.message || member.work || '';
  const educationText = member.education || member.eduacation || '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">Member Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gradient">{member.name}</h3>
            {roleText && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Briefcase className="h-3 w-3 mr-1" />
                {roleText}
              </Badge>
            )}
          </div>

          {/* Additional Info */}
          {educationText && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">{educationText}</p>
            </div>
          )}

          {member.department && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-sm"><strong>Department:</strong> {member.department}</p>
            </div>
          )}

          {member.ward && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-sm"><strong>Ward:</strong> {member.ward}</p>
            </div>
          )}

          {/* Description */}
          {descriptionText && (
            <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm italic text-foreground">
                "{descriptionText}"
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row gap-3">
            {member.contact && (
              <Button variant="outline" className="flex-1" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                {member.contact}
              </Button>
            )}
            {member.email && (
              <Button variant="outline" className="flex-1" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                {member.email}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberPopupModal;
