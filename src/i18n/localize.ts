function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Overlay `patch` onto `base`. Strings and string lists in the patch replace
 * the base. Objects merge key by key. Lists of objects with a `slug` match on
 * that slug; every other list merges by index, so a translation can override
 * one field without rewriting the rest.
 */
export function localize<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;
  if (typeof base === "string") return (typeof patch === "string" ? patch : base) as T;

  if (Array.isArray(base) && Array.isArray(patch)) {
    if (
      base.every((item) => typeof item === "string") &&
      patch.every((item) => typeof item === "string")
    ) {
      return patch as T;
    }
    if (base.every(isPlainObject) && patch.every(isPlainObject)) {
      const bySlug =
        base.every((item) => typeof item.slug === "string") &&
        patch.every((item) => typeof item.slug === "string");
      if (bySlug) {
        return base.map((item) => {
          const match = patch.find((candidate) => candidate.slug === item.slug);
          return match ? localize(item, match) : item;
        }) as T;
      }
    }
    return base.map((item, index) =>
      patch[index] === undefined ? item : localize(item, patch[index]),
    ) as T;
  }

  if (isPlainObject(base) && isPlainObject(patch)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(patch)) {
      if (key in base) out[key] = localize(base[key], patch[key]);
    }
    return out as T;
  }

  return base;
}
