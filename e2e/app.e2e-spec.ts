import { DrawingsPage } from './app.po';

describe('drawings App', function() {
  let page: DrawingsPage;

  beforeEach(() => {
    page = new DrawingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
