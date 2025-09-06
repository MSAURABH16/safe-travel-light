import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TouristForm {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  nationality: string;
  accommodation: string;
  visitDuration: string;
  medicalInfo: string;
}

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<TouristForm>();

  const onSubmit = async (data: TouristForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Registration Successful!",
      description: "Welcome to SafeTourist. Your safety profile has been created.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Tourist Registration
          </CardTitle>
          <p className="text-muted-foreground">
            Register with SafeTourist to ensure your safety during your visit
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="+1 234 567 8900"
                      className="pl-10"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    {...register("emergencyContact", { required: "Emergency contact is required" })}
                    placeholder="Jane Doe"
                  />
                  {errors.emergencyContact && (
                    <p className="text-sm text-destructive">{errors.emergencyContact.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="emergencyPhone"
                      {...register("emergencyPhone", { required: "Emergency phone is required" })}
                      placeholder="+1 234 567 8900"
                      className="pl-10"
                    />
                  </div>
                  {errors.emergencyPhone && (
                    <p className="text-sm text-destructive">{errors.emergencyPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Travel Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accommodation">Accommodation</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="accommodation"
                      {...register("accommodation")}
                      placeholder="Hotel name or address"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visitDuration">Visit Duration</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="visitDuration"
                      {...register("visitDuration")}
                      placeholder="e.g., 1 week"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalInfo">Medical Information (Optional)</Label>
                <Textarea
                  id="medicalInfo"
                  {...register("medicalInfo")}
                  placeholder="Any medical conditions, allergies, or medications that emergency responders should know about"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register for SafeTourist"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}