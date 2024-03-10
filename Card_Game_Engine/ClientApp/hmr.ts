import { ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
export const hmrBootstrap = (
  module: any,
  bootstrap: () => Promise<ApplicationRef>
) => {
  let ngModule: ApplicationRef;
  module.hot.accept();
  bootstrap().then((mod) => (ngModule = mod));
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map((c) => c.location.nativeElement);
    const removeOldHosts = createNewHosts(elements);
    ngModule.destroy();
    removeOldHosts();
  });
};
