
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Bot, Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { propertyTypes } from "@/lib/placeholder-images"
import { getAiSuggestions } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  locationPreferences: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  propertyType: z.string({ required_error: "Please select a property type." }),
  priceRange: z.string().min(2, {
    message: "Price range is required.",
  }),
  features: z.string(),
  otherPreferences: z.string(),
});

export function AiSuggestionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultFormValues = {
    locationPreferences: "",
    propertyType: "House",
    priceRange: "₹30,00,000 - ₹50,00,000",
    features: "Garden, Parking",
    otherPreferences: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });
  
  const resetState = () => {
    setSuggestion(null);
    setError(null);
    form.reset(defaultFormValues);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await getAiSuggestions(values);

    if (result.success) {
      setSuggestion(result.suggestions ?? null);
    } else {
      setError(result.error ?? null);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if(!open) resetState(); }}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Sparkles className="mr-2 h-4 w-4" /> Get AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Real Estate Expert</DialogTitle>
          <DialogDescription>
            Tell our AI what you're looking for, and we'll find the perfect match.
          </DialogDescription>
        </DialogHeader>
        {suggestion ? (
          <div className="py-4">
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>Your Personalized Suggestions</AlertTitle>
              <AlertDescription className="mt-2 whitespace-pre-wrap">
                {suggestion}
              </AlertDescription>
            </Alert>
             <DialogFooter className="mt-4">
              <Button onClick={resetState}>Ask Again</Button>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="locationPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, Bangalore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., ₹50,00,000 - ₹75,00,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Features</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Garden, Balcony, Parking" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="otherPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Near good schools, quiet neighborhood" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : "Get Suggestions"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
