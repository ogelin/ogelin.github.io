---
title: Adding an LLM to a Traditional Mobile App Architecture for Shipaton 2026
description: Initial thoughts on where LLMs and MCP fit within a traditional mobile application architecture.
published: 2026-08-22
---

I am excited to have joined [RevenueCat's Shipaton](https://www.shipaton.com/) this year! I'm planning to use it as an opportunity to build an end-to-end mobile application with LLM and MCP integration. The product itself is private for now, but I thought I'd start by sharing some initial thoughts about its architecture.

## Where to add an LLM layer?

The application is based on the familiar, well-established three-layer structure we all know:

**mobile client → backend API/business logic → database**

In our architecture design, the LLM sits on its own path alongside that flow and is invoked only for operations that benefit from interpretation or reasoning. Deterministic operations stay within the three-layer application path.

<figure class="architecture-figure">
  <a href="/site/diagrams/llm-application-architecture.svg">
    <img src="/site/diagrams/llm-application-architecture.svg" alt="Architecture diagram showing the mobile client, application API, services and database on the deterministic path, with an LLM orchestrator and MCP server on a separate path for validated tool calls." />
  </a>
  <figcaption>Initial application architecture. Select the diagram to open the full-size version.</figcaption>
</figure>

Recently, I enjoyed reading Chip Huyen's [Building a Generative AI Platform](https://huyenchip.com/2024/07/25/genai-platform.html), which takes a similar incremental approach: start with a conventional application and introduce additional AI components as the requirements justify them.

For this project, the separate LLM path is useful primarily for **cost and modularity**. Model inference adds latency and cost, so limiting calls to tasks that actually require them makes both easier to observe and control. It also keeps the AI component relatively self-contained, which should make it easier to compare or replace models later if we need.

There is also the security benefit of keeping the model outside the data layer. LLM operations still need to pass through the application's authorization, validation, and business logic.

## Where does MCP fit in?

The official [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/getting-started/intro) defines MCP as:

> “an open-source standard for connecting AI applications to external systems.”

In this design, the MCP server exposes a limited set of operations to the model. For example, we might expose `get_requests()`, `get_history()`, `search_catalog()`, and `update_draft()`.

This was inspired by Simon Willison's writing on [LLM tool use](https://simonwillison.net/2025/May/27/llm-tools/): rather than giving a model broad access to application state and letting it do what it wants, expose specific functions it can call when needed. MCP provides the protocol around that interaction.

On a final note, this is the initial design rather than a final one. I expect to revisit some of these boundaries as I work on the project, but it was interesting to learn more about where LLMs and MCP fit into a traditional software architecture.
