---
title: Adding an LLM to a Traditional Mobile App Architecture for Shipaton 2026
description: Initial thoughts on where LLMs and MCP fit within a traditional mobile application architecture.
published: 2026-08-22
---

I am excited to have joined [RevenueCat's Shipaton](https://www.shipaton.com/) this year! I'm planning to use it as an opportunity to build an end-to-end mobile application with LLM and MCP integration. The product itself is private for now, but I thought I'd start by sharing some initial thoughts about its architecture. I'm planning to share more as things develop further.

## Where does the LLM fit in?

The application is based on the familiar, well-established three-layer architecture:

**mobile client → backend API/business logic → database**

In this design, the LLM sits on a separate path alongside that flow and is invoked only for operations that benefit from interpretation or reasoning. Deterministic operations stay within the conventional application path.

<figure class="architecture-figure">
  <a href="/site/diagrams/llm-application-architecture.svg">
    <img src="/site/diagrams/llm-application-architecture.svg" alt="Architecture diagram showing the mobile client, application API, services and database on the deterministic path, with an LLM orchestrator and MCP server on a separate path for validated tool calls." />
  </a>
  <figcaption>Initial application architecture. Select the diagram to open the full-size version.</figcaption>
</figure>

Recently, I enjoyed reading Chip Huyen's [Building a Generative AI Platform](https://huyenchip.com/2024/07/25/genai-platform.html), which takes a similar incremental approach: start with a conventional application and introduce additional AI components as the requirements justify them.

For this project, the separate LLM path is useful primarily for **cost and modularity**. Model inference adds latency and cost, so limiting calls to tasks that actually require them makes both easier to observe and control. It also keeps the AI component relatively self-contained, which should make it easier to compare or replace models later if needed.

There's also a security benefit: requests coming through the LLM still pass through the application layer, where they are authorized and validated.

## Where does MCP fit in?

The official [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/getting-started/intro) defines MCP as:

> “an open-source standard for connecting AI applications to external systems.”

In this design, the MCP server exposes a limited set of operations to the model. For example, we might expose `get_requests()`, `get_history()`, `search_catalog()`, and `update_draft()`.

For a single LLM integration, MCP might be overkill, and ordinary function calling would work. In this project, though, I expect multiple AI workflows and models to need access to similar operations. **MCP will provide a standardized interface for those integrations.**

This part of the design was inspired by Simon Willison's writing on [LLM tool use](https://simonwillison.net/2025/May/27/llm-tools/): rather than giving a model broad access to application state, expose specific functions it can call when needed.

This is an initial design rather than a final one. I expect to revisit some of these boundaries as I work on the project, but thinking through the architecture has already been a useful way to understand how LLMs and MCP can fit into a more traditional software system.
