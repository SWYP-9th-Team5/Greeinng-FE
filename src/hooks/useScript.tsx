import { useEffect, useState } from 'react';

export interface ScriptProps {
  src: HTMLScriptElement['src'] | null;
  checkForExisting?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type ErrorState = ErrorEvent | null;
type ScriptStatus = {
  loading: boolean;
  error: ErrorState;
  scriptEl: HTMLScriptElement;
};
type ScriptStatusMap = {
  [key: string]: ScriptStatus;
};

export const scripts: ScriptStatusMap = {};

const checkExisting = (src: string): ScriptStatus | undefined => {
  const existing: HTMLScriptElement | null = document.querySelector(
    `script[src="${src}"]`,
  );
  if (existing) {
    return (scripts[src] = {
      loading: false,
      error: null,
      scriptEl: existing,
    });
  }
  return undefined;
};

export default function useScript({
  src,
  checkForExisting = false,
  ...attributes
}: ScriptProps): [boolean, ErrorState] {
  let status: ScriptStatus | undefined = src ? scripts[src] : undefined;

  if (!status && checkForExisting && src && isBrowser) {
    status = checkExisting(src);
  }

  const [loading, setLoading] = useState<boolean>(
    status ? status.loading : Boolean(src),
  );
  const [error, setError] = useState<ErrorState>(status ? status.error : null);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isBrowser || !src || scriptLoaded || error) return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    status = scripts[src];
    if (!status && checkForExisting) {
      status = checkExisting(src);
    }

    // Determine or create <script> element to listen to.
    let scriptEl: HTMLScriptElement;
    if (status) {
      scriptEl = status.scriptEl;
    } else {
      scriptEl = document.createElement('script');
      scriptEl.src = src;

      Object.keys(attributes).forEach((key) => {
        scriptEl.setAttribute(key, attributes[key]);
      });

      status = scripts[src] = {
        loading: true,
        error: null,
        scriptEl: scriptEl,
      };
    }

    const handleLoad = () => {
      if (status) status.loading = false;
      setLoading(false);
      setScriptLoaded(true);
    };
    const handleError = (error: ErrorEvent) => {
      if (status) status.error = error;
      setError(error);
    };

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);

    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    };
  }, [src]);

  return [loading, error];
}

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
