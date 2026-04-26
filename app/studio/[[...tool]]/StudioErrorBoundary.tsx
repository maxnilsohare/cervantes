"use client";

import { Component, type ReactNode } from "react";

type StudioErrorBoundaryProps = {
  children: ReactNode;
};

type StudioErrorBoundaryState = {
  error: Error | null;
};

export class StudioErrorBoundary extends Component<StudioErrorBoundaryProps, StudioErrorBoundaryState> {
  state: StudioErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): StudioErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("Sanity Studio failed to load", error);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    const message = this.state.error.message || "Unknown Studio error";
    const needsProjectCheck = message.includes("Project with ID") || message.includes("users/me");

    return (
      <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 text-[#203028]">
        <div className="mx-auto max-w-2xl border border-[#c9aa63] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8d7440]">Sanity Studio</p>
          <h1 className="mt-4 font-serif text-3xl text-[#203028] sm:text-4xl">Studio could not connect</h1>
          <p className="mt-4 text-sm leading-7 text-[#425247] sm:text-base">
            The Studio route is enabled, but this browser could not finish connecting to your Sanity project.
          </p>

          {needsProjectCheck ? (
            <div className="mt-6 space-y-3 text-sm leading-7 text-[#425247] sm:text-base">
              <p>Sanity is currently reporting that the configured project could not be found or reached with this account.</p>
              <p>
                Check <code className="rounded bg-[#f6f1e7] px-1.5 py-0.5 text-xs text-[#203028]">NEXT_PUBLIC_SANITY_PROJECT_ID</code>, make sure the
                project exists, and confirm the person signed into Studio has access to it.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-[#425247] sm:text-base">
              Review your Sanity environment variables, project access, and allowed Studio origins, then reload this page.
            </p>
          )}

          <pre className="mt-8 overflow-x-auto border border-[#e4d7bc] bg-[#f9f6ef] p-4 text-xs leading-6 text-[#425247]">{message}</pre>
        </div>
      </main>
    );
  }
}
