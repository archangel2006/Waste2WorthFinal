import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { availableBadges, userBadges } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function RewardsPage() {
  const currentLevel = 3;
  const progress = 65;
  const nextLevel = 4;
  
  const unlockedBadges = availableBadges.filter(b => userBadges.includes(b.id));
  const lockedBadges = availableBadges.filter(b => !userBadges.includes(b.id));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            You are currently Level {currentLevel}. Keep up the great work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Level {currentLevel}</span>
            <span>Level {nextLevel}</span>
          </div>
          <Progress value={progress} className="w-full h-3" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {100-progress}% to the next level
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <CardDescription>
            A collection of your achievements on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {unlockedBadges.map((badge) => (
                        <Tooltip key={badge.id}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                                        <badge.icon className="w-12 h-12 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium text-center">{badge.name}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{badge.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                     {lockedBadges.map((badge) => (
                        <Tooltip key={badge.id}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-2 opacity-40">
                                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                                        <badge.icon className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium text-center">{badge.name}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{badge.description} (Locked)</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
