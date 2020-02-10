import { AppMaterialModule } from './app.material.module';

describe('App.MaterialModule', () => {
  let appMaterialModule: AppMaterialModule;

  beforeEach(() => {
    appMaterialModule = new AppMaterialModule();
  });

  it('should create an instance', () => {
    expect(appMaterialModule).toBeTruthy();
  });
});
