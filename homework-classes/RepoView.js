'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(currentRepo) {
      this.container.innerHTML = '';
      const table = createAndAppend('table', this.container);

      let tr = createAndAppend('tr', table);
      createAndAppend('th', tr, {
        text: 'Repository:',
      });
      const td = createAndAppend('td', tr);
      createAndAppend('a', td, {
        text: currentRepo.name,
        href: currentRepo.html_url,
      });

      tr = createAndAppend('tr', table);
      createAndAppend('th', tr, {
        text: 'Description:',
      });
      createAndAppend('td', tr, {
        text: currentRepo.description,
      });

      tr = createAndAppend('tr', table);
      createAndAppend('th', tr, {
        text: 'Forks:',
      });
      createAndAppend('td', tr, {
        text: currentRepo.forks,
      });

      tr = createAndAppend('tr', table);
      createAndAppend('th', tr, {
        text: 'Updated:',
      });
      createAndAppend('td', tr, {
        text: currentRepo.updated_at,
      });
    }
  }

  window.RepoView = RepoView;
}
