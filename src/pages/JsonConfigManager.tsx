import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Village {
  id: string;
  name: string;
}

const JsonConfigManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [jsonContent, setJsonContent] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    fetchVillages();
  }, []);

  useEffect(() => {
    if (selectedVillage) {
      loadVillageConfig();
    }
  }, [selectedVillage]);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchVillages = async () => {
    const { data, error } = await supabase
      .from('villages')
      .select('id, name')
      .eq('is_active', true)
      .order('name');

    if (!error && data) {
      setVillages(data);
    }
  };

  const loadVillageConfig = async () => {
    try {
      setLoading(true);
      setValidationError(null);
      setValidationSuccess(false);

      const { data: configData, error } = await supabase
        .from('village_config')
        .select('config_data')
        .eq('village_id', selectedVillage)
        .maybeSingle();

      if (error) {
        console.error('Error loading config:', error);
      } else if (configData) {
        setJsonContent(JSON.stringify(configData.config_data, null, 2));
      }
    } catch (err) {
      console.error('Error in loadVillageConfig:', err);
      toast({
        title: 'Error',
        description: 'Failed to load configuration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateJson = (text: string): boolean => {
    try {
      JSON.parse(text);
      setValidationError(null);
      setValidationSuccess(true);
      return true;
    } catch (e) {
      setValidationError(e instanceof Error ? e.message : 'Invalid JSON format');
      setValidationSuccess(false);
      return false;
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonContent(value);
    if (value.trim()) {
      validateJson(value);
    } else {
      setValidationError(null);
      setValidationSuccess(false);
    }
  };

  const handleSave = async () => {
    if (!selectedVillage) {
      toast({
        title: 'Error',
        description: 'Please select a village',
        variant: 'destructive',
      });
      return;
    }

    if (!validateJson(jsonContent)) {
      toast({
        title: 'Invalid JSON',
        description: 'Please fix the JSON syntax errors before saving',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const parsedConfig = JSON.parse(jsonContent);
      const { data: { user } } = await supabase.auth.getUser();

      // Check if config exists
      const { data: existingConfig } = await supabase
        .from('village_config')
        .select('id')
        .eq('village_id', selectedVillage)
        .maybeSingle();

      if (existingConfig) {
        // Update existing
        const { error } = await supabase
          .from('village_config')
          .update({
            config_data: parsedConfig,
            updated_by: user?.id,
            updated_at: new Date().toISOString(),
          })
          .eq('village_id', selectedVillage);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('village_config')
          .insert({
            village_id: selectedVillage,
            config_data: parsedConfig,
            updated_by: user?.id,
          });

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Configuration saved successfully',
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save configuration',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">JSON Configuration Manager</h1>
            <p className="text-muted-foreground">
              Manage village configuration data dynamically
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Village Configuration Editor</CardTitle>
            <CardDescription>
              Select a village and edit its configuration JSON. Changes are saved to the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Village</label>
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a village..." />
                </SelectTrigger>
                <SelectContent>
                  {villages.map((village) => (
                    <SelectItem key={village.id} value={village.id}>
                      {village.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedVillage && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Configuration JSON</label>
                  <Textarea
                    value={jsonContent}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="font-mono text-sm min-h-[500px]"
                    placeholder="Enter JSON configuration..."
                  />
                </div>

                {validationError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                {validationSuccess && !validationError && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      Valid JSON format
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving || !!validationError || !jsonContent.trim()}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonConfigManager;
