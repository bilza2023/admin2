

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CqmbKHpD.js","_app/immutable/chunks/scheduler.D5E9w3yW.js","_app/immutable/chunks/index.XwPOAcCG.js"];
export const stylesheets = ["_app/immutable/assets/4.CiOj15UQ.css"];
export const fonts = [];
