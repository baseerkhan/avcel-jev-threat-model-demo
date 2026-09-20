# Experiment validation record

Validated in production: 2026-09-20T16:00:24.000Z

Live URL: <https://avcel.ai/experiments/jev-threat-triage/>

Release: `20260920T160047Z-avcel1`

## Real Jev run

| Field | Observed value |
| --- | --- |
| Requested model alias | `jev-latest` |
| Model returned by API | `jev-1.13.0` |
| Selected flow | `streamlit-to-provider` |
| State SHA-256 | `2bf12f7d6ee0959c05ee92102d46bbc36e8c98e2ebc5f1115d120c720b1c0be1` |
| Catalog version | `2026-09-19.1` |
| Threat judgments | 18 |
| Jev duration | 431.28 ms |
| Deterministic duration | 0.20 ms |
| Jev usage | 7,821 input tokens; 346 output tokens |
| Jev distribution | 10 likely applicable; 4 uncertain; 4 unlikely applicable |
| Request ID returned | Yes |

The deterministic rules were materially faster in this observed run. Jev's demonstrated contribution was a probability for every bounded semantic judgment and different coverage on questions that exact evidence-ID rules left uncertain. One run is not a general benchmark.

## Workflow checks

- Health endpoint reported ready without operational detail.
- Application Model endpoint returned four documented flows and the 18-pattern catalog.
- Human review was persisted as a separate authority record.
- Run Record export contained the application model, source register, catalog, state hash, both machine paths, and human review.
- The evaluation and review remained available after an application restart.
- The configured TypeSafe API key was absent from the stored evaluation and exported Run Record.
- Seven automated tests passed and `npm audit --audit-level=high` reported no vulnerabilities.
- HTTPS, static assets, the public API, the Noul payload drawer, and direct route loading were verified from outside the server.
- The browser console reported no warnings or errors during a real public evaluation.
- The service was verified on its isolated Node.js 24.21.0 LTS runtime after a restart.

## Supported conclusion

This run does **not** show that Jev is faster than fixed rules. It supports a narrower conclusion: Jev completed 18 semantic applicability judgments in one typed request in approximately 431 ms, while preserving probabilities that can drive a visible uncertainty gate and human review.

The experiment did not execute a conventional generative LLM, so it provides no direct timing or quality comparison with that class of model.
