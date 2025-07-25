import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: string;
  requirements: any;
  rewards: any;
  startDate: string;
  endDate: string;
  progress?: number;
  isCompleted?: boolean;
}

export default function ChallengesPanel() {
  const { user } = useAuth();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['/api/challenges', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/challenges');
      return response.json();
    },
    enabled: !!user?.id
  });

  const weeklyChallenges = challenges.filter((c: Challenge) => c.type === 'weekly');
  const monthlyChallenges = challenges.filter((c: Challenge) => c.type === 'monthly');
  const specialChallenges = challenges.filter((c: Challenge) => c.type === 'special');

  const formatTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Scaduta";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}g ${hours}h rimanenti`;
    return `${hours}h rimanenti`;
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'weekly': return '⚡';
      case 'monthly': return '🏆';
      case 'special': return '⭐';
      default: return '🎯';
    }
  };

  const getRewardText = (rewards: any) => {
    const parts = [];
    if (rewards.points) parts.push(`${rewards.points} Punti Edo`);
    if (rewards.badge) parts.push(`Badge: ${rewards.badge}`);
    if (rewards.title) parts.push(`Titolo: ${rewards.title}`);
    return parts.join(' • ');
  };

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <Card className="modern-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getChallengeIcon(challenge.type)}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{challenge.title}</h3>
              <p className="text-gray-600 text-sm">{challenge.description}</p>
            </div>
          </div>
          {challenge.isCompleted && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Completata
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progresso</span>
              <span className="font-semibold text-blue-600">
                {challenge.progress || 0}%
              </span>
            </div>
            <Progress 
              value={challenge.progress || 0} 
              className="h-3 bg-gray-200"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {formatTimeRemaining(challenge.endDate)}
            </span>
            <Badge variant="outline" className="text-xs">
              {getRewardText(challenge.rewards)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Card className="modern-card">
        <CardHeader>
          <CardTitle>🎯 Sfide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">Caricamento sfide...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          🎯 Sfide Attive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="weekly" className="text-sm">
              Settimanali ({weeklyChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm">
              Mensili ({monthlyChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="special" className="text-sm">
              Speciali ({specialChallenges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            {weeklyChallenges.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">⚡</div>
                <p>Nessuna sfida settimanale attiva</p>
              </div>
            ) : (
              weeklyChallenges.map((challenge: Challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            )}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyChallenges.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🏆</div>
                <p>Nessuna sfida mensile attiva</p>
              </div>
            ) : (
              monthlyChallenges.map((challenge: Challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            )}
          </TabsContent>

          <TabsContent value="special" className="space-y-4">
            {specialChallenges.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">⭐</div>
                <p>Nessuna sfida speciale attiva</p>
              </div>
            ) : (
              specialChallenges.map((challenge: Challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}