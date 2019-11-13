'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      createAndAppend('h4', this.container, {
        text: 'Contributions',
      });
      const ul = createAndAppend('ul', this.container);

      contributors
        .sort((contributor1, contributor2) =>
          contributor1.login.localeCompare(contributor2.login),
        )
        .forEach(contributor => {
          const li = createAndAppend('li', ul);
          createAndAppend('img', li, {
            src: contributor.avatar_url,
            class: 'contributor-avatar',
          });
          const nameSpan = createAndAppend('span', li, {
            class: 'contributor-name',
          });
          createAndAppend('a', nameSpan, {
            text: contributor.login,
            href: contributor.html_url,
          });
          createAndAppend('span', li, {
            text: contributor.contributions,
            class: 'contributor-contributions',
          });
        });
    }
  }

  window.ContributorsView = ContributorsView;
}
