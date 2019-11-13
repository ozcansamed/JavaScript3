'use strict';

{
  const root = document.getElementById('root');

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  async function fetchJSON(url) {
    const response = await axios.get(url);
    return response.data;
  }

  async function fillContributorsDetails(currentRepo, contributorsSection) {
    try {
      const contributors = await fetchJSON(currentRepo.contributors_url);
      createAndAppend('h4', contributorsSection, {
        text: 'Contributions',
      });
      const ul = createAndAppend('ul', contributorsSection);

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
    } catch (err) {
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    }
  }

  function fillRepoDetails(currentRepo, repoSection) {
    const table = createAndAppend('table', repoSection);

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

  function loadRepo(repoSection, contributorsSection, currentRepo) {
    repoSection.innerHTML = '';
    contributorsSection.innerHTML = '';

    // fill contributor section
    fillContributorsDetails(currentRepo, contributorsSection);

    // fill repo section
    fillRepoDetails(currentRepo, repoSection);
  }

  async function main(url) {
    const header = createAndAppend('header', root, {
      text: 'HYF Repositories',
    });
    const select = createAndAppend('select', header);

    const mainElm = createAndAppend('main', root, {
      class: 'main-container',
    });
    const repoSection = createAndAppend('section', mainElm, {
      class: 'repo-container',
    });

    const contributorsSection = createAndAppend('section', mainElm, {
      class: 'contributors-container',
    });

    try {
      const repos = await fetchJSON(url);

      repos
        .sort((repo1, repo2) => repo1.name.localeCompare(repo2.name))
        .forEach(repo =>
          createAndAppend('option', select, {
            text: repo.name,
          }),
        );

      // fetch and fill the current selected repo
      select.addEventListener('change', () => {
        loadRepo(repoSection, contributorsSection, repos[select.selectedIndex]);
      });

      // fetch and fill the first repo when data arrived
      loadRepo(repoSection, contributorsSection, repos[select.selectedIndex]);
    } catch (err) {
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    }
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
