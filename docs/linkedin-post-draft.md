# LinkedIn post draft

Founders are already claiming that Jev can outperform conventional LLM approaches on speed and accuracy, and that an LLM may be the wrong tool for bounded decisions.

I bought into that idea and took a leap of faith. But I did not want to repeat the claim without testing it.

So I built a small public experiment through Avcel.

The experiment evaluates one documented software flow against 18 sourced threat patterns. It sends the same factual application state through two paths:

1. Transparent deterministic rules
2. Jev using 18 typed Noul judgments in one server-side request

I used the deterministic path as the comparison baseline and initially framed the test around speed and accuracy.

The first runs gave me a more useful answer than a simple winner:

- The deterministic rules were materially faster.
- Jev still completed all 18 semantic judgments in a few hundred milliseconds.
- Jev returned a probability for every judgment, making uncertainty and human-review gates visible.
- The two paths disagreed on some patterns, which exposed exactly where more evidence is needed.

One important correction: this experiment does not yet prove accuracy. A defensible accuracy claim requires a labeled ground-truth dataset and repeated trials. It also does not compare Jev directly with a conventional LLM because no conventional LLM was run.

That is the point of building the experiment publicly. Evidence should come before the claim.

You can run it here:
https://avcel.ai/experiments/jev-threat-triage/

I would be interested in how others would design the next comparison. What labeled dataset, LLM baseline, and decision-quality measures would you use?

#Avcel #Jev #AIEngineering #AIEvaluation #EnterpriseAI #SoftwareArchitecture #Cybersecurity #ThreatModeling #ResponsibleAI #DeterministicAI #HumanInTheLoop
