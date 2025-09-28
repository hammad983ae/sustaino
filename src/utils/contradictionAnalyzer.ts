export interface ContradictionPattern {
  id: string;
  name: string;
  type: 'logical' | 'factual' | 'temporal' | 'quantitative' | 'semantic';
  pattern: RegExp;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ContradictionRule {
  id: string;
  name: string;
  check: (text: string) => Promise<ContradictionMatch[]>;
  category: string;
}

export interface ContradictionMatch {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: string[];
  confidence: number;
  location?: {
    start: number;
    end: number;
    context: string;
  };
  suggestions?: string[];
}

// Predefined contradiction patterns
export const contradictionPatterns: ContradictionPattern[] = [
  {
    id: 'absolute-conditional',
    name: 'Absolute vs Conditional Statements',
    type: 'logical',
    pattern: /(always|never|all|none|every|no one).*(?:sometimes|occasionally|often|rarely|few|some)/i,
    description: 'Contradiction between absolute and conditional statements',
    severity: 'high'
  },
  {
    id: 'quantitative-opposite',
    name: 'Opposing Quantitative Trends',
    type: 'quantitative',
    pattern: /(increase|rise|grow|up|higher|more).*(?:decrease|fall|decline|down|lower|less|reduce)/i,
    description: 'Contradictory quantitative trends in the same context',
    severity: 'medium'
  },
  {
    id: 'temporal-conflict',
    name: 'Temporal Contradictions',
    type: 'temporal',
    pattern: /(before|earlier|prior|first).*(?:after|later|following|then|subsequently)/i,
    description: 'Conflicting temporal sequence descriptions',
    severity: 'medium'
  },
  {
    id: 'boolean-opposite',
    name: 'Boolean Contradictions',
    type: 'factual',
    pattern: /(yes|true|correct|right|accurate).*(?:no|false|incorrect|wrong|inaccurate)/i,
    description: 'Direct contradictory boolean statements',
    severity: 'high'
  },
  {
    id: 'quality-opposite',
    name: 'Quality Contradictions',
    type: 'semantic',
    pattern: /(excellent|great|good|positive|beneficial).*(?:terrible|bad|poor|negative|harmful)/i,
    description: 'Contradictory quality assessments',
    severity: 'medium'
  },
  {
    id: 'existence-contradiction',
    name: 'Existence Contradictions',
    type: 'logical',
    pattern: /(exists?|present|available|there is).*(?:doesn't exist|absent|unavailable|there is no)/i,
    description: 'Contradictory statements about existence or presence',
    severity: 'high'
  },
  {
    id: 'capability-contradiction',
    name: 'Capability Contradictions',
    type: 'logical',
    pattern: /(can|able|capable|possible).*(?:cannot|unable|incapable|impossible)/i,
    description: 'Contradictory statements about capabilities or possibilities',
    severity: 'medium'
  }
];

// Semantic opposition pairs
export const oppositionPairs = [
  ['large', 'small'], ['big', 'little'], ['huge', 'tiny'],
  ['fast', 'slow'], ['quick', 'sluggish'], ['rapid', 'gradual'],
  ['hot', 'cold'], ['warm', 'cool'], ['high', 'low'],
  ['safe', 'dangerous'], ['secure', 'risky'], ['stable', 'unstable'],
  ['simple', 'complex'], ['easy', 'difficult'], ['clear', 'confusing'],
  ['strong', 'weak'], ['powerful', 'powerless'], ['effective', 'ineffective'],
  ['expensive', 'cheap'], ['costly', 'affordable'], ['profitable', 'unprofitable'],
  ['success', 'failure'], ['winner', 'loser'], ['victory', 'defeat'],
  ['accept', 'reject'], ['approve', 'deny'], ['include', 'exclude'],
  ['start', 'stop'], ['begin', 'end'], ['open', 'close']
];

export class ContradictionAnalyzer {
  private patterns: ContradictionPattern[];
  private customRules: ContradictionRule[];

  constructor() {
    this.patterns = [...contradictionPatterns];
    this.customRules = [];
  }

  async analyzeText(text: string): Promise<ContradictionMatch[]> {
    const contradictions: ContradictionMatch[] = [];
    
    // Clean and prepare text
    const cleanText = this.preprocessText(text);
    const sentences = this.splitIntoSentences(cleanText);
    
    // Run pattern-based analysis
    const patternMatches = await this.runPatternAnalysis(cleanText, sentences);
    contradictions.push(...patternMatches);
    
    // Run semantic analysis
    const semanticMatches = await this.runSemanticAnalysis(sentences);
    contradictions.push(...semanticMatches);
    
    // Run cross-sentence analysis
    const crossSentenceMatches = await this.runCrossSentenceAnalysis(sentences);
    contradictions.push(...crossSentenceMatches);
    
    // Run custom rules
    for (const rule of this.customRules) {
      const ruleMatches = await rule.check(cleanText);
      contradictions.push(...ruleMatches);
    }
    
    // Remove duplicates and rank by confidence
    return this.deduplicateAndRank(contradictions);
  }

  private preprocessText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .trim();
  }

  private splitIntoSentences(text: string): string[] {
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  private async runPatternAnalysis(text: string, sentences: string[]): Promise<ContradictionMatch[]> {
    const matches: ContradictionMatch[] = [];
    
    for (const pattern of this.patterns) {
      const match = pattern.pattern.exec(text);
      if (match) {
        // Find the sentence containing this match
        const matchingSentence = sentences.find(s => s.toLowerCase().includes(match[0].toLowerCase()));
        
        matches.push({
          type: pattern.type,
          severity: pattern.severity,
          description: pattern.description,
          evidence: matchingSentence ? [matchingSentence] : [match[0]],
          confidence: 85,
          location: {
            start: match.index || 0,
            end: (match.index || 0) + match[0].length,
            context: matchingSentence || match[0]
          },
          suggestions: this.generateSuggestions(pattern.type, pattern.description)
        });
      }
    }
    
    return matches;
  }

  private async runSemanticAnalysis(sentences: string[]): Promise<ContradictionMatch[]> {
    const matches: ContradictionMatch[] = [];
    
    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();
      
      // Check for opposition pairs within the same sentence
      for (const [word1, word2] of oppositionPairs) {
        if (lowerSentence.includes(word1) && lowerSentence.includes(word2)) {
          // Check if they're not in a comparative context
          const isComparative = /(?:more|less|than|compared|versus|vs|rather|instead)/i.test(sentence);
          
          if (!isComparative) {
            matches.push({
              type: 'semantic',
              severity: 'medium',
              description: `Contradictory terms "${word1}" and "${word2}" found in same statement`,
              evidence: [sentence],
              confidence: 70,
              suggestions: [
                'Consider if both terms are necessary in the same context',
                'Clarify the relationship between these opposing concepts',
                'Use more specific language to avoid ambiguity'
              ]
            });
          }
        }
      }
    }
    
    return matches;
  }

  private async runCrossSentenceAnalysis(sentences: string[]): Promise<ContradictionMatch[]> {
    const matches: ContradictionMatch[] = [];
    
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        const sent1 = sentences[i].toLowerCase();
        const sent2 = sentences[j].toLowerCase();
        
        // Check for opposing statements across sentences
        for (const [word1, word2] of oppositionPairs) {
          const sent1HasWord1 = sent1.includes(word1);
          const sent1HasWord2 = sent1.includes(word2);
          const sent2HasWord1 = sent2.includes(word1);
          const sent2HasWord2 = sent2.includes(word2);
          
          // Look for contradictory patterns
          if ((sent1HasWord1 && sent2HasWord2) || (sent1HasWord2 && sent2HasWord1)) {
            // Additional context checking to reduce false positives
            const contextWords = ['but', 'however', 'although', 'while', 'whereas', 'in contrast'];
            const hasContextualConnection = contextWords.some(word => 
              sent1.includes(word) || sent2.includes(word)
            );
            
            if (!hasContextualConnection) {
              matches.push({
                type: 'semantic',
                severity: 'high',
                description: `Contradictory statements about "${word1}" vs "${word2}" across different sentences`,
                evidence: [sentences[i], sentences[j]],
                confidence: 75,
                suggestions: [
                  'Review these statements for consistency',
                  'Consider adding clarifying context',
                  'Ensure both statements can be true simultaneously'
                ]
              });
            }
          }
        }
        
        // Check for direct negation patterns
        const negationPatterns = [
          { positive: /is (true|correct|accurate|valid)/i, negative: /is (false|incorrect|inaccurate|invalid)/i },
          { positive: /will (happen|occur|succeed)/i, negative: /will not (happen|occur|succeed)/i },
          { positive: /can (do|achieve|accomplish)/i, negative: /cannot (do|achieve|accomplish)/i }
        ];
        
        for (const pattern of negationPatterns) {
          if (pattern.positive.test(sent1) && pattern.negative.test(sent2)) {
            matches.push({
              type: 'logical',
              severity: 'critical',
              description: 'Direct logical contradiction between statements',
              evidence: [sentences[i], sentences[j]],
              confidence: 90,
              suggestions: [
                'Resolve the logical contradiction',
                'Clarify which statement is accurate',
                'Consider if both can be true under different conditions'
              ]
            });
          }
        }
      }
    }
    
    return matches;
  }

  private generateSuggestions(type: string, description: string): string[] {
    const suggestions: Record<string, string[]> = {
      logical: [
        'Review the logical consistency of your statements',
        'Consider whether all conditions and exceptions are properly specified',
        'Use more precise language to avoid logical conflicts'
      ],
      factual: [
        'Verify the accuracy of factual claims',
        'Ensure consistent use of factual information',
        'Consider citing sources for contradictory facts'
      ],
      temporal: [
        'Clarify the chronological order of events',
        'Use specific dates or time references',
        'Consider if events occurred simultaneously'
      ],
      quantitative: [
        'Verify numerical data and trends',
        'Specify the time periods for different measurements',
        'Consider whether trends apply to different contexts'
      ],
      semantic: [
        'Use more precise terminology',
        'Define ambiguous terms clearly',
        'Consider the context in which different terms are used'
      ]
    };
    
    return suggestions[type] || [
      'Review the identified contradiction',
      'Consider clarifying or rephrasing the conflicting statements',
      'Ensure consistency throughout the document'
    ];
  }

  private deduplicateAndRank(contradictions: ContradictionMatch[]): ContradictionMatch[] {
    // Remove near-duplicates based on evidence similarity
    const unique: ContradictionMatch[] = [];
    
    for (const contradiction of contradictions) {
      const isDuplicate = unique.some(existing => 
        existing.type === contradiction.type &&
        existing.description === contradiction.description &&
        this.calculateSimilarity(existing.evidence, contradiction.evidence) > 0.8
      );
      
      if (!isDuplicate) {
        unique.push(contradiction);
      }
    }
    
    // Sort by severity and confidence
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    
    return unique.sort((a, b) => {
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.confidence - a.confidence;
    });
  }

  private calculateSimilarity(evidence1: string[], evidence2: string[]): number {
    const set1 = new Set(evidence1.map(e => e.toLowerCase()));
    const set2 = new Set(evidence2.map(e => e.toLowerCase()));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  addCustomRule(rule: ContradictionRule): void {
    this.customRules.push(rule);
  }

  addCustomPattern(pattern: ContradictionPattern): void {
    this.patterns.push(pattern);
  }
}