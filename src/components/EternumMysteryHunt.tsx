import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import AIDetectionSystem from "./AIDetectionSystem";
import EternumRulesOfEngagement from "./EternumRulesOfEngagement";
import { 
  Clock, 
  Skull, 
  Brain, 
  Trophy, 
  AlertTriangle, 
  Eye, 
  Zap,
  Lock,
  Unlock,
  Timer,
  Users,
  DollarSign,
  ArrowLeft,
  Home,
  Shield
} from "lucide-react";

interface Puzzle {
  id: number;
  clueText: string;
  difficulty: number;
  puzzleType: string;
  isRevealed: boolean;
  isSolved: boolean;
}

interface Player {
  address: string;
  currentStage: number;
  completedPuzzles: boolean[];
  freeClues: number;
  isDisqualified: boolean;
}

const EXTREMELY_DIFFICULT_PUZZLES = [
  {
    id: 0,
    clueText: "I am the sum of the first 17 prime numbers, divided by the golden ratio (φ), then multiplied by Euler's number (e), rounded to the nearest integer. What am I?",
    difficulty: 95,
    puzzleType: "mathematical",
    hint: "φ ≈ 1.618, e ≈ 2.718, sum of first 17 primes = 1028"
  },
  {
    id: 1,
    clueText: "My atomic number reveals the secret: I am the element that, when combined with oxygen in a 2:3 ratio, creates the compound that gives blood its crimson hue. In the shadows of chemistry, I hold the key to life and death.",
    difficulty: 85,
    puzzleType: "chemistry",
    hint: "Think about hemoglobin and what makes blood red"
  },
  {
    id: 2,
    clueText: "In the realm where shadows dance with light, I am the number that appears when you solve: ∫₀^π sin(x)cos(x)dx × √(144) × log₁₀(1000)",
    difficulty: 90,
    puzzleType: "mathematical",
    hint: "Integration, square root, and logarithm combined"
  },
  {
    id: 3,
    clueText: "I whisper secrets in the dark, where passion meets precision. Find me in the coordinates where the North Star's declination meets the angle of desire: 89°16' North, and the longitude where time began its eternal dance.",
    difficulty: 88,
    puzzleType: "seductive",
    hint: "Polaris position and Prime Meridian"
  },
  {
    id: 4,
    clueText: "The final evidence lies where the Fibonacci sequence meets the speed of light: Take the 21st Fibonacci number, multiply by c (m/s), divide by Avogadro's constant, and find the GPS coordinates hidden in the result.",
    difficulty: 99,
    puzzleType: "ultimate",
    hint: "F₂₁ = 10946, c = 299792458 m/s, Nₐ = 6.022×10²³"
  }
];

export const EternumMysteryHunt = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [answer, setAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [huntActive, setHuntActive] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [prizePot, setPrizePot] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [aiDetected, setAiDetected] = useState(false);
  const [detectionReason, setDetectionReason] = useState('');
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);
  const { toast } = useToast();

  const handleAIDetection = (reason: string) => {
    setAiDetected(true);
    setDetectionReason(reason);
    toast({
      title: "⚠️ AI/Bot Detected",
      description: "Suspicious activity detected. Hunt participation blocked.",
      variant: "destructive"
    });
  };

  // Simulate hunt data
  useEffect(() => {
    // Initialize with first puzzle if joined
    if (isJoined && !currentPuzzle) {
      setCurrentPuzzle({
        ...EXTREMELY_DIFFICULT_PUZZLES[0],
        isRevealed: true,
        isSolved: false
      });
      setPlayerData({
        address: '0x1234...5678',
        currentStage: 0,
        completedPuzzles: [false, false, false, false, false],
        freeClues: 1,
        isDisqualified: false
      });
    }
    
    // Countdown timer
    const deadline = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, deadline - now);
      setTimeRemaining(remaining);
      
      if (remaining === 0) {
        setHuntActive(false);
        toast({
          title: "💀 TIME'S UP!",
          description: "The Eternum coins are lost forever...",
          variant: "destructive"
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isJoined, currentPuzzle, toast]);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${days}d ${hours}h ${minutes}m`;
  };

  const joinHunt = () => {
    setIsJoined(true);
    setTotalPlayers(247); // Simulated
    setPrizePot(12.5); // ETH
    toast({
      title: "🔥 Welcome to the Hunt!",
      description: "You've entered the most dangerous game ever created. May the odds be in your favor.",
    });
  };

  const submitAnswer = () => {
    if (!currentPuzzle || !playerData) return;

    // Simulate answer checking (in real implementation, this would call smart contract)
    const correctAnswers = [
      "1944", // Puzzle 0: Mathematical calculation result
      "26",   // Puzzle 1: Iron (Fe) atomic number
      "24",   // Puzzle 2: Calculus result
      "0",    // Puzzle 3: Prime Meridian (0° longitude)
      "40.7589,-73.9851" // Puzzle 4: Final GPS coordinates (example)
    ];

    const currentStage = playerData.currentStage;
    const isCorrect = answer.toLowerCase().trim() === correctAnswers[currentStage]?.toLowerCase();

    if (isCorrect) {
      const newCompletedPuzzles = [...playerData.completedPuzzles];
      newCompletedPuzzles[currentStage] = true;
      
      const newPlayerData = {
        ...playerData,
        currentStage: currentStage + 1,
        completedPuzzles: newCompletedPuzzles
      };
      setPlayerData(newPlayerData);

      if (currentStage + 1 < EXTREMELY_DIFFICULT_PUZZLES.length) {
        // Load next puzzle
        setCurrentPuzzle({
          ...EXTREMELY_DIFFICULT_PUZZLES[currentStage + 1],
          isRevealed: true,
          isSolved: false
        });
        
        toast({
          title: "🧩 Puzzle Solved!",
          description: `Stage ${currentStage + 1} completed. The mystery deepens...`,
        });
      } else {
        // Final puzzle solved - winner!
        setWinner(playerData.address);
        setHuntActive(false);
        toast({
          title: "🏆 EVIDENCE FOUND!",
          description: "You've uncovered the final piece! The Eternum coins are yours!",
        });
      }
      
      setAnswer('');
    } else {
      toast({
        title: "❌ Wrong Answer",
        description: "The shadows mock your attempt. Try again, if you dare...",
        variant: "destructive"
      });
    }
  };

  const useFreeClue = () => {
    if (!playerData || playerData.freeClues === 0) return;
    
    const hint = EXTREMELY_DIFFICULT_PUZZLES[playerData.currentStage]?.hint;
    if (hint) {
      toast({
        title: "💡 Free Clue Revealed",
        description: hint,
      });
      
      setPlayerData({
        ...playerData,
        freeClues: playerData.freeClues - 1
      });
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 95) return "bg-red-600";
    if (difficulty >= 90) return "bg-orange-500";
    if (difficulty >= 85) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPuzzleTypeIcon = (type: string) => {
    switch (type) {
      case "mathematical": return <Brain className="w-4 h-4" />;
      case "chemistry": return <Zap className="w-4 h-4" />;
      case "seductive": return <Eye className="w-4 h-4" />;
      case "ultimate": return <Skull className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/sustano-sphere">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              AI PROTECTED HUNT
            </Badge>
          </div>
          
          <Card className="border-red-500/50 bg-black/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-red-400 mb-4">
                🔮 THE ETERNUM MYSTERY HUNT 🔮
              </CardTitle>
              <CardDescription className="text-xl text-gray-300">
                The rarest coins in existence. The ultimate unsolved mystery.
                <br />One winner takes all... or the coins are lost forever.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-yellow-500/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <Trophy className="w-5 h-5" />
                      The Prize
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      The ultra-rare <strong>Eternum</strong> coin + culprit's coin. 
                      Value increases with each failed attempt by other players.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-400">
                      <Skull className="w-5 h-5" />
                      The Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      If no one solves the mystery in time, both coins are 
                      <strong> burned forever</strong>. Gone. Lost to the void.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-500/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <Brain className="w-5 h-5" />
                      The Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">
                      Extremely difficult puzzles: advanced mathematics, chemistry, 
                      cryptic riddles, and seductive clues.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-orange-500/50 bg-orange-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning: Point of No Return</AlertTitle>
                <AlertDescription>
                  Entry fee: 0.1 ETH. Once you join, there's no backing out. 
                  Solve all puzzles or lose everything. Rules violations result in penalties.
                </AlertDescription>
              </Alert>

              {/* Rules of Engagement */}
              <EternumRulesOfEngagement 
                onAccept={() => setHasAcceptedRules(true)}
                hasAccepted={hasAcceptedRules}
              />

              <div className="text-center">
                <Button 
                  onClick={joinHunt}
                  size="lg"
                  disabled={!hasAcceptedRules}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎭 ENTER THE HUNT (0.1 ETH)
                </Button>
                {!hasAcceptedRules && (
                  <p className="text-sm text-red-400 mt-2">
                    You must accept the rules of engagement to continue
                  </p>
                )}
              </div>

              <div className="text-center text-sm text-gray-400">
                <p>The hunt ends in {formatTime(timeRemaining)} ⏰</p>
                <p>Current players: {totalPlayers || 0} | Prize pool: {prizePot} ETH</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/sustano-sphere">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            AI PROTECTED
          </Badge>
        </div>

        {/* AI Detection Alert */}
        {aiDetected && (
          <Alert className="mb-6 border-red-500 bg-red-950/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-red-400">Hunt Participation Blocked</AlertTitle>
            <AlertDescription className="text-red-300">
              {detectionReason}. This hunt is for human participants only. 
              AI/bot usage violates the terms and results in immediate disqualification.
            </AlertDescription>
          </Alert>
        )}

        {/* AI Detection System */}
        <div className="mb-6">
          <AIDetectionSystem 
            onAIDetected={handleAIDetection}
            isActive={huntActive && isJoined && !aiDetected}
          />
        </div>
        
        {/* Hunt Status Header */}
        <Card className="mb-6 border-red-500/50 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-red-400">🔮 ETERNUM HUNT ACTIVE</CardTitle>
                <CardDescription className="text-gray-300">
                  {winner ? `🏆 Winner: ${winner}` : 'The evidence awaits...'}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-orange-400 text-xl font-bold">
                  <Timer className="w-5 h-5" />
                  {formatTime(timeRemaining)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {totalPlayers} hunters
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {prizePot} ETH
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Player Progress */}
          <Card className="border-blue-500/50 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Trophy className="w-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {playerData && (
                <>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Stage {playerData.currentStage + 1} of {EXTREMELY_DIFFICULT_PUZZLES.length}</span>
                      <span className="text-gray-300">{Math.round((playerData.currentStage / EXTREMELY_DIFFICULT_PUZZLES.length) * 100)}%</span>
                    </div>
                    <Progress value={(playerData.currentStage / EXTREMELY_DIFFICULT_PUZZLES.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    {EXTREMELY_DIFFICULT_PUZZLES.map((puzzle, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {playerData.completedPuzzles[index] ? (
                          <Unlock className="w-4 h-4 text-green-400" />
                        ) : index === playerData.currentStage ? (
                          <Eye className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600" />
                        )}
                        <span className={`
                          ${playerData.completedPuzzles[index] ? 'text-green-400' : 
                            index === playerData.currentStage ? 'text-yellow-400' : 'text-gray-600'}
                        `}>
                          Stage {index + 1}: {puzzle.puzzleType}
                        </span>
                        {getPuzzleTypeIcon(puzzle.puzzleType)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Free Clues</span>
                      <Badge variant="outline" className="text-purple-400 border-purple-400">
                        {playerData.freeClues}
                      </Badge>
                    </div>
                    {playerData.freeClues > 0 && (
                      <Button 
                        onClick={useFreeClue}
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2 border-purple-500 text-purple-400 hover:bg-purple-500/20"
                      >
                        💡 Use Free Clue
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Current Puzzle */}
          <Card className="lg:col-span-2 border-red-500/50 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    {currentPuzzle && getPuzzleTypeIcon(currentPuzzle.puzzleType)}
                    Stage {(playerData?.currentStage || 0) + 1}: {currentPuzzle?.puzzleType?.toUpperCase() || 'LOCKED'}
                  </CardTitle>
                  {currentPuzzle && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getDifficultyColor(currentPuzzle.difficulty)} text-white`}>
                        Difficulty: {currentPuzzle.difficulty}/100
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentPuzzle ? (
                <>
                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <Brain className="h-4 w-4" />
                    <AlertTitle>The Clue</AlertTitle>
                    <AlertDescription className="text-lg font-medium text-yellow-200 mt-2">
                      {currentPuzzle.clueText}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      className="bg-gray-800 border-gray-600 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                    />
                    <Button 
                      onClick={submitAnswer}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                      disabled={!answer.trim() || !huntActive || aiDetected}
                    >
                      🔍 Submit Answer
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    ⚠️ Wrong answers may result in penalties. Choose wisely.
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Lock className="w-12 h-12 mx-auto mb-4" />
                  <p>Complete previous stages to unlock this puzzle</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Crime Story */}
        <Card className="mt-6 border-purple-500/50 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-400">🕵️ The Unsolved Mystery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              In the depths of the digital realm, a crime was committed that shook the foundations of trust. 
              The evidence scattered across mathematical proofs, chemical formulas, and cryptic messages. 
              Only the brilliant mind that solves all puzzles will uncover the location of the final evidence—
              and claim the rarest digital artifacts ever created. But beware... time is running out, 
              and the culprit, known only as <strong className="text-red-400">Nempehis</strong>, 
              will stop at nothing to keep their secrets buried forever.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EternumMysteryHunt;