import { useState } from "react";
import { Plus, MapPin, Clock, Edit2, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ItineraryItem {
  id: string;
  title: string;
  location: string;
  time: string;
  duration: string;
  description: string;
  category: "sightseeing" | "food" | "activity" | "transport" | "rest";
}

interface DayPlan {
  day: number;
  date: string;
  items: ItineraryItem[];
}

export default function TripItinerary() {
  const [tripPlans, setTripPlans] = useState<DayPlan[]>([
    {
      day: 1,
      date: "2025-03-12",
      items: [
        {
          id: "1",
          title: "Arrive in Mumbai",
          location: "Chhatrapati Shivaji Maharaj International Airport",
          time: "09:15",
          duration: "3h 30m",
          description: "Land and travel to hotel",
          category: "transport"
        },
        {
          id: "2",
          title: "Check-in at Hotel",
          location: "The Taj Mahal Palace, Mumbai",
          time: "12:45",
          duration: "45m",
          description: "Check-in and freshen up",
          category: "rest"
        },
        {
          id: "3",
          title: "Lunch at Leopold Cafe",
          location: "Leopold Cafe, Colaba",
          time: "14:15",
          duration: "1h 45m",
          description: "Traditional Mumbai street food experience",
          category: "food"
        },
        {
          id: "4",
          title: "Gateway of India",
          location: "Apollo Bandar, Colaba",
          time: "16:30",
          duration: "2h 15m",
          description: "Visit the iconic monument and waterfront",
          category: "sightseeing"
        }
      ]
    },
    {
      day: 2,
      date: "2025-03-13",
      items: [
        {
          id: "5",
          title: "Marine Drive Walk",
          location: "Marine Drive, Mumbai",
          time: "06:45",
          duration: "1h 20m",
          description: "Morning walk along Queen's Necklace",
          category: "activity"
        },
        {
          id: "6",
          title: "Breakfast at Cafe Mocha",
          location: "Linking Road, Bandra",
          time: "08:30",
          duration: "55m",
          description: "Continental breakfast with sea view",
          category: "food"
        }
      ]
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [newItem, setNewItem] = useState<Partial<ItineraryItem>>({
    title: "",
    location: "",
    time: "",
    duration: "",
    description: "",
    category: "sightseeing"
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sightseeing": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "food": return "bg-orange-500/10 text-orange-700 border-orange-200";
      case "activity": return "bg-green-500/10 text-green-700 border-green-200";
      case "transport": return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "rest": return "bg-gray-500/10 text-gray-700 border-gray-200";
      default: return "bg-blue-500/10 text-blue-700 border-blue-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sightseeing": return "🏛️";
      case "food": return "🍽️";
      case "activity": return "🎯";
      case "transport": return "🚗";
      case "rest": return "🏨";
      default: return "📍";
    }
  };

  const addDay = () => {
    const newDay = tripPlans.length + 1;
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + newDay - 1);
    
    setTripPlans([...tripPlans, {
      day: newDay,
      date: newDate.toISOString().split('T')[0],
      items: []
    }]);
  };

  const addItem = () => {
    if (!newItem.title || !newItem.location || !newItem.time) return;

    const item: ItineraryItem = {
      id: Date.now().toString(),
      title: newItem.title!,
      location: newItem.location!,
      time: newItem.time!,
      duration: newItem.duration || "1h 30m",
      description: newItem.description || "",
      category: newItem.category as ItineraryItem["category"]
    };

    setTripPlans(tripPlans.map(day => 
      day.day === selectedDay 
        ? { ...day, items: [...day.items, item] }
        : day
    ));

    setNewItem({
      title: "",
      location: "",
      time: "",
      duration: "",
      description: "",
      category: "sightseeing"
    });
    setIsAddDialogOpen(false);
  };

  const removeItem = (dayNum: number, itemId: string) => {
    setTripPlans(tripPlans.map(day => 
      day.day === dayNum 
        ? { ...day, items: day.items.filter(item => item.id !== itemId) }
        : day
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trip Itinerary</h1>
          <p className="text-muted-foreground mt-2">Plan your perfect journey day by day</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addDay} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
                <DialogDescription>
                  Add a new activity to your itinerary
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="day-select">Select Day</Label>
                  <Select value={selectedDay.toString()} onValueChange={(value) => setSelectedDay(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tripPlans.map((day) => (
                        <SelectItem key={day.day} value={day.day.toString()}>
                          Day {day.day} - {new Date(day.date).toLocaleDateString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Activity Title</Label>
                  <Input
                    id="title"
                    value={newItem.title || ""}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="e.g., Visit Red Fort"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newItem.location || ""}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="e.g., Red Fort, Delhi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newItem.time || ""}
                      onChange={(e) => setNewItem({...newItem, time: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newItem.duration || ""}
                      onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                      placeholder="e.g., 2h 30m"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value as ItineraryItem["category"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sightseeing">🏛️ Sightseeing</SelectItem>
                      <SelectItem value="food">🍽️ Food & Dining</SelectItem>
                      <SelectItem value="activity">🎯 Activity</SelectItem>
                      <SelectItem value="transport">🚗 Transport</SelectItem>
                      <SelectItem value="rest">🏨 Rest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description || ""}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Additional notes about this activity..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addItem}>Add Activity</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="day-view" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="day-view">Day by Day</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="day-view" className="space-y-6">
          {tripPlans.map((day) => (
            <Card key={day.day} className="w-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {day.day}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Day {day.day}
                    </CardTitle>
                    <CardDescription>
                      {new Date(day.date).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {day.items.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activities planned for this day</p>
                    <p className="text-sm">Click "Add Activity" to start planning</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {day.items.map((item, index) => (
                      <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                            {index + 1}
                          </div>
                          {index < day.items.length - 1 && (
                            <div className="w-px h-16 bg-border"></div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.time} ({item.duration})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className={getCategoryColor(item.category)}>
                                {getCategoryIcon(item.category)} {item.category}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(day.day, item.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
              <CardDescription>Summary of your entire trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{tripPlans.length}</div>
                  <div className="text-sm text-muted-foreground">Total Days</div>
                </div>
                <div className="text-center p-4 bg-orange-500/5 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {tripPlans.reduce((acc, day) => acc + day.items.filter(item => item.category === 'food').length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Food Experiences</div>
                </div>
                <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {tripPlans.reduce((acc, day) => acc + day.items.filter(item => item.category === 'sightseeing').length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Sightseeing</div>
                </div>
                <div className="text-center p-4 bg-green-500/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {tripPlans.reduce((acc, day) => acc + day.items.filter(item => item.category === 'activity').length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Activities</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">All Activities by Category</h4>
                {['sightseeing', 'food', 'activity', 'transport', 'rest'].map(category => {
                  const items = tripPlans.flatMap(day => 
                    day.items.filter(item => item.category === category)
                  );
                  if (items.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <h5 className="font-medium capitalize flex items-center gap-2">
                        <span>{getCategoryIcon(category)}</span>
                        {category} ({items.length})
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {items.map(item => (
                          <div key={item.id} className="p-3 border rounded-lg text-sm">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-muted-foreground">{item.location}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}