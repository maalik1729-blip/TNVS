# TNVS UI/UX Redesign Workflow

This document provides a structured 5-stage workflow for auditing and redesigning the Tamil Nadu Vanigargalin Sangamam (TNVS) trader portal.

---

# STAGE 1 — UI/UX AUDIT

## Purpose

This stage focuses on identifying:
- UI weaknesses specific to a Tamil trader portal
- UX friction for non-technical users
- usability problems for bilingual (Tamil/English) interface
- layout inconsistencies
- cognitive overload in complex forms (membership registration)
- accessibility issues for older traders
- mobile responsiveness gaps for field users

The purpose is to create a detailed understanding of:
- what confuses Tamil-speaking traders
- what reduces trust in the association
- what creates visual clutter in information-heavy sections
- what reduces form completion rates
- what prevents users from finding key features (voter search, membership)

---

## Goal

Generate a complete UI/UX audit document that:
- identifies major interface issues in the trader portal
- prioritizes usability problems for non-technical users
- explains user pain points specific to Tamil trader demographics
- documents visual hierarchy issues in bilingual content
- analyzes interaction friction in multi-step forms
- creates a reference point for redesign stages

**Expected Output File:** `outputs/01_tnvs_ui_audit.md`

---

## Prompt

You are a senior UI/UX auditor specializing in government and association portals for non-technical users in India.

Analyze the current TNVS web application.

**Context:**
- TNVS is Tamil Nadu's official traders association portal
- Primary users: Tamil-speaking traders, shop owners, small business owners
- Age range: 30-65, varying technical literacy
- Languages: Tamil and English bilingual interface
- Key features: Membership registration, Voter ID search, Dashboard, Wings/Divisions, Services

**Your goals:**
- identify UI problems for non-technical users
- identify UX friction in bilingual content switching
- identify cognitive overload in the 5-step membership form
- identify layout inconsistencies in dashboard and services
- identify spacing issues in information-dense sections
- identify typography hierarchy issues in Tamil text
- identify usability concerns for older users (larger touch targets, clearer CTAs)
- identify trust issues (certificates, member verification)
- identify accessibility gaps for screen readers in Tamil
- identify mobile responsiveness problems for field users

**Instructions:**
1. Be highly critical
2. Think like a senior product designer for Indian government portals
3. Think from the perspective of:
   - first-time Tamil traders with limited tech experience
   - shop owners using mobile phones on the go
   - users switching between Tamil and English
   - older users with vision challenges
4. Explain WHY each issue matters
5. Prioritize findings by severity (Critical, High, Medium, Low)

**Output Requirements:**
Generate a markdown document named `outputs/01_tnvs_ui_audit.md`

**Required Structure:**

# Executive Summary

# Major UX Problems

# Major UI Problems

# User Friction Points

# Visual Hierarchy Problems

# Typography & Bilingual Content Problems

# Accessibility Problems

# Mobile Responsiveness Problems

# Cognitive Load Analysis

# Trust & Credibility Issues

# Tamil Language-Specific Issues

# Recommended Priority Fixes

---

# STAGE 2 — UX IMPROVEMENT STRATEGY

## Purpose

This stage focuses on improving:
- user flow for membership registration
- interaction clarity for voter search
- workflow simplicity for dashboard navigation
- usability of bilingual interface
- navigation logic for non-technical users
- user confidence in official processes

The purpose is to convert identified problems into:
- practical UX improvements
- reduced friction workflows
- better interaction patterns
- clearer navigation structures
- simplified user experiences for Tamil traders

This stage focuses on experience logic rather than visual redesign.

---

## Goal

Create a UX strategy document that:
- improves usability for non-technical users
- reduces confusion in bilingual switching
- simplifies workflows for membership and voter search
- improves navigation clarity for older users
- improves onboarding for first-time traders
- improves CTA visibility and trust
- reduces cognitive load in multi-step forms
- improves mobile interaction flow for field users

**Expected Output File:** `outputs/02_tnvs_ux_strategy.md`

---

## Prompt

Read: `outputs/01_tnvs_ui_audit.md`

Act as a senior product designer specializing in Indian government and association portals.

Based on the audit findings:

**Your goals:**
- reduce friction in membership registration
- simplify workflows for voter ID verification
- improve navigation clarity for non-technical users
- improve usability of bilingual content
- improve onboarding for first-time traders
- improve CTA visibility and trust signals
- improve user confidence in official processes
- reduce cognitive load in multi-step forms
- improve mobile usability for field users

**For every recommendation:**
- explain WHY it matters for Tamil traders
- explain user impact
- explain business impact (membership conversion, engagement)

**Instructions:**
- Do not redesign visually yet
- Focus only on UX logic and flow improvements
- Prioritize usability over aesthetics
- Consider Tamil language and cultural context
- Consider mobile-first usage patterns

**Generate a markdown document named:** `outputs/02_tnvs_ux_strategy.md`

**Required Structure:**

# UX Strategy Overview

# Membership Registration Workflow Simplifications

# Voter ID Search Workflow Improvements

# Navigation Improvements

# Dashboard Improvements

# Bilingual Interface Improvements

# Form Improvements

# CTA & Trust Signal Improvements

# User Psychology Improvements

# Information Hierarchy Improvements

# Mobile UX Improvements

# Accessibility Enhancements

# Recommended UX Priorities

---

# STAGE 3 — VISUAL REDESIGN DIRECTION

## Purpose

This stage focuses on creating:
- a modern visual system for a government/association portal
- improved hierarchy for bilingual content
- cleaner layouts for information-dense sections
- stronger readability for Tamil text
- component consistency across pages
- premium and trustworthy product presentation

The purpose is to transform UX strategy into:
- structured visual direction
- scalable UI patterns for trader portal
- modern interface systems
- simplified layouts
- improved scanning and readability

This stage focuses on visual clarity and consistency.

---

## Goal

Generate a visual redesign blueprint that:
- improves visual hierarchy for bilingual content
- modernizes interface appearance while maintaining trust
- improves spacing consistency
- improves typography systems for Tamil and English
- reduces clutter in information-heavy sections
- creates scalable UI patterns
- improves readability for older users

**Expected Output File:** `outputs/03_tnvs_visual_direction.md`

---

## Prompt

Read: `outputs/02_tnvs_ux_strategy.md`

Act as a senior product UI designer specializing in government and association portals in India.

Create a premium yet trustworthy visual redesign direction.

**Reference quality similar to:**
- Government of India portals (clean, accessible, trustworthy)
- Modern Indian banking apps (HDFC, ICICI - clear, functional)
- Indian Railways IRCTC (information-dense but organized)

**Your goals:**
- improve visual hierarchy for bilingual content
- create cleaner layouts for information-dense sections
- improve spacing consistency
- modernize typography for Tamil text
- reduce clutter in dashboard and membership
- improve readability for older users
- improve component consistency
- improve dashboard clarity

**Focus Areas:**
- layout system for bilingual content
- card design for membership and services
- typography (Tamil + English)
- button system (clear CTAs for non-technical users)
- table design for member lists
- navigation design (simple, clear)
- color hierarchy (trustworthy, official)
- responsive behavior for mobile-first usage

**Instructions:**
- Explain design reasoning
- Explain what should be removed
- Explain what should be simplified
- Explain what should become visually dominant
- Consider accessibility for older users
- Consider mobile-first usage patterns

**Generate a markdown document named:** `outputs/03_tnvs_visual_direction.md`

**Required Structure:**

# Visual Design Philosophy

# Typography Recommendations (Tamil + English)

# Layout System

# Color Hierarchy

# Navigation Redesign

# Dashboard Redesign

# Card Component Redesign

# Table Redesign

# Form Redesign

# Button System

# Mobile-first Design Adjustments

# Bilingual UI Consistency Rules

# Visual Simplification Opportunities

---

# STAGE 4 — COMPONENT EXECUTION PLAN

## Purpose

This stage focuses on converting redesign direction into:
- implementation-ready tasks
- frontend execution details
- component-level changes
- responsive behavior definitions
- interaction specifications

The purpose is to create:
- actionable implementation instructions
- developer-ready execution plans
- structured UI change documentation
- scalable frontend implementation guidance

This stage bridges design thinking and frontend execution.

---

## Goal

Create a component execution document that:
- explains exact UI changes for TNVS components
- defines interaction improvements
- explains responsive behavior
- organizes implementation priorities
- improves frontend clarity
- improves developer handoff quality

**Expected Output File:** `outputs/04_tnvs_component_plan.md`

---

## Prompt

Read: `outputs/03_tnvs_visual_direction.md`

Act as a senior frontend architect + product designer.

Convert the redesign direction into implementation-level tasks.

**For every component:**
- explain current issue
- explain redesign goal
- explain exact UI changes
- explain interaction improvements
- explain responsive behavior
- explain spacing and layout changes

**Focus on:**
- frontend execution clarity
- developer handoff quality
- implementation simplicity
- Tamil language support considerations
- Mobile-first responsive behavior

**Generate a markdown document named:** `outputs/04_tnvs_component_plan.md`

**Required Structure:**

# Header Changes

# Sidebar Changes

# Navigation Improvements

# Dashboard Card Changes

# Table Improvements

# Form Improvements (Membership, Voter Search)

# Button System Improvements

# Modal Improvements

# Empty State Improvements

# Error State Improvements

# Bilingual Component Improvements

# Responsive Design Tasks

# Mobile Interaction Improvements

# Frontend Handoff Notes

# Component Priority Order

---

# STAGE 5 — FINAL UX REVIEW

## Purpose

This stage focuses on:
- quality assurance
- UX validation
- accessibility review
- responsive testing
- edge case analysis
- release readiness evaluation

The purpose is to identify:
- remaining usability risks
- interaction inconsistencies
- accessibility concerns
- mobile usability gaps
- implementation weaknesses

This stage validates the redesign before execution or release.

---

## Goal

Create a final UX review document that:
- validates usability quality for Tamil traders
- identifies remaining gaps
- creates QA checklists
- improves release confidence
- reviews responsive behavior
- reviews accessibility compliance

**Expected Output File:** `outputs/05_tnvs_final_review.md`

---

## Prompt

Read: `outputs/04_tnvs_component_plan.md`

Act as a senior UX reviewer specializing in Indian government portals.

Perform a final review of the redesign plan.

**Your goals:**
- identify remaining UX gaps for non-technical users
- identify accessibility issues for Tamil screen readers
- identify edge cases (long Tamil text, special characters)
- identify mobile usability concerns
- identify performance concerns
- identify interaction inconsistencies
- identify developer implementation risks

Then create:
1. Final UX QA checklist
2. Accessibility checklist (Tamil language)
3. Responsive testing checklist
4. User testing checklist (with Tamil speakers)
5. Release readiness checklist

**Generate a markdown document named:** `outputs/05_tnvs_final_review.md`

**Required Structure:**

# Final UX Review Summary

# Remaining UX Risks

# Accessibility Risks (Tamil Language)

# Responsive Design Risks

# Interaction Consistency Review

# Edge Case Review

# Performance Considerations

# UX QA Checklist

# Accessibility QA Checklist (Tamil + English)

# Mobile Testing Checklist

# User Testing Checklist (with Tamil speakers)

# Release Readiness Checklist

# Final Recommendations

---

# Usage Instructions

To use this workflow:

1. **Stage 1:** Run the UI Audit prompt to identify all issues
2. **Stage 2:** Run the UX Strategy prompt to plan improvements
3. **Stage 3:** Run the Visual Direction prompt to define design system
4. **Stage 4:** Run the Component Plan prompt to create implementation tasks
5. **Stage 5:** Run the Final Review prompt to validate before release

Each stage builds on the previous stage's output. Always complete stages in order.
