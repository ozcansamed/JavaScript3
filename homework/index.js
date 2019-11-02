'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul, {
      class: 'repository',
    });
    const table = createAndAppend('table', li);

    const headers = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const details = ['name', 'description', 'forks', 'updated_at'];

    for (let i = 0; i < headers.length; ++i) {
      const tr = createAndAppend('tr', table);
      createAndAppend('th', tr, {
        text: headers[i],
      });
      if (details[i] === 'name') {
        const td = createAndAppend('td', tr);
        createAndAppend('a', td, {
          href: repo.html_url,
          text: repo.name,
        });
      } else if (details[i] === 'updated_at') {
        createAndAppend('td', tr, {
          text: new Date(repo.updated_at).toLocaleString(),
        });
      } else {
        createAndAppend('td', tr, {
          text: repo[details[i]],
        });
      }
    }
  }

  function main(url) {
    const root = document.getElementById('root');
    createAndAppend('header', root, {
      text: 'HYF Repositories',
    });
    fetchJSON(url, (err, repos) => {
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root, {
        class: 'repositories',
      });
      repos
        .sort((repo1, repo2) => repo1.name.localeCompare(repo2.name))
        .forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
