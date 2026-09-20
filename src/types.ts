import type { NoulQuestion } from "@typesafe-ai/sdk";

export type Provenance = {
  id: string;
  label: string;
  url: string;
  retrievedAt: string;
};

export type ModelFact = {
  id: string;
  kind:
    | "actor"
    | "component"
    | "asset"
    | "entry-point"
    | "authentication"
    | "authorization"
    | "store"
    | "external-service"
    | "boundary"
    | "flow"
    | "control"
    | "unknown";
  statement: string;
  provenance: Provenance;
};

export type ModelFlow = {
  id: string;
  label: string;
  from: string;
  to: string;
  data: string[];
  boundaryIds: string[];
  factIds: string[];
};

export type ApplicationModel = {
  name: string;
  repository: string;
  commit: string;
  capturedAt: string;
  facts: ModelFact[];
  flows: ModelFlow[];
};

export type ThreatPattern = {
  id: string;
  name: string;
  family: "STRIDE" | "OWASP" | "CWE" | "Assurance";
  definition: string;
  indicators: string[];
  defaultSeverity: "low" | "medium" | "high" | "critical";
  source: Provenance;
};

export type ThreatEvaluationState = {
  applicationModel: {
    name: string;
    repository: string;
    commit: string;
    selectedFlow: ModelFlow;
    relevantFacts: ModelFact[];
    knownUnknowns: ModelFact[];
  };
  threatCatalog: Array<{
    id: string;
    name: string;
    definition: string;
    indicators: string[];
  }>;
  decisionPolicy: {
    purpose: string;
    trueMeaning: string;
    falseMeaning: string;
    uncertaintyRule: string;
  };
};

export type ThreatQuestionSet = Record<string, NoulQuestion>;

export type ThreatDecision = {
  threatId: string;
  threatName: string;
  disposition: "likely-applicable" | "uncertain" | "unlikely-applicable";
  probability: number | null;
  evidenceFactIds: string[];
  rationale: string;
  requiresHumanReview: boolean;
};

export type ThreatDecisionResult = {
  provider: "deterministic" | "jev";
  providerVersion: string;
  durationMs: number;
  decisions: ThreatDecision[];
  requestId?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
};

export interface ThreatDecisionProvider {
  evaluate(
    state: ThreatEvaluationState,
    questions: ThreatQuestionSet,
  ): Promise<ThreatDecisionResult>;
}

export type HumanReview = {
  action: "approved" | "rejected" | "overridden";
  reason: string;
  reviewer: string;
  reviewedAt: string;
};

export type EvaluationRecord = {
  id: string;
  createdAt: string;
  stateHash: string;
  catalogVersion: string;
  selectedFlowId: string;
  deterministic: ThreatDecisionResult;
  jev: ThreatDecisionResult;
  humanReview?: HumanReview;
};
