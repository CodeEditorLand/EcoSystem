import{EditorContributionInstantiation as r,registerEditorContribution as i}from"../../../browser/editorExtensions.js";import{ToggleStickyScroll as e,FocusStickyScroll as l,SelectEditor as c,SelectPreviousStickyScrollLine as S,SelectNextStickyScrollLine as n,GoToStickyScrollLine as m}from"./stickyScrollActions.js";import{StickyScrollController as t}from"./stickyScrollController.js";import{registerAction2 as o}from"../../../../platform/actions/common/actions.js";i(t.ID,t,r.AfterFirstRender),o(e),o(l),o(S),o(n),o(m),o(c);