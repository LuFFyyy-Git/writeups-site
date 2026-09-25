(() => {
  const progress = document.querySelector('.reading-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const content = document.getElementById('post-content');
  const toc = document.getElementById('toc');
  if (content && toc) {
    const headings = [...content.querySelectorAll('h2, h3')];
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName.slice(1);
      toc.appendChild(link);
    });

    if (headings.length) {
      const links = [...toc.querySelectorAll('a')];
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        links.forEach((link) => link.classList.toggle('is-active', link.hash === `#${visible.target.id}`));
      }, { rootMargin: '-18% 0px -72% 0px' });
      headings.forEach((heading) => observer.observe(heading));
    }
  }

  if (content) {
    const phoneCrops = {
      'marcus-approach-witness.jpeg': '503 / 620',
      'arm-washing-witness.jpeg': '503 / 630',
      'livestream-marcus-return.jpeg': '503 / 690',
      'marcus-missing-team-chat.jpeg': '503 / 900'
    };

    const lightbox = document.createElement('dialog');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('aria-label', 'Evidence image preview');

    const panel = document.createElement('div');
    panel.className = 'image-lightbox__panel';

    const closeButton = document.createElement('button');
    closeButton.className = 'image-lightbox__close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close image preview');
    closeButton.textContent = 'Close ×';

    const previewFrame = document.createElement('div');
    previewFrame.className = 'image-lightbox__frame';

    const previewImage = document.createElement('img');
    previewImage.className = 'image-lightbox__image';

    const caption = document.createElement('p');
    caption.className = 'image-lightbox__caption';

    previewFrame.appendChild(previewImage);
    panel.append(closeButton, previewFrame, caption);
    lightbox.appendChild(panel);
    document.body.appendChild(lightbox);

    const openPreview = (image) => {
      previewImage.src = image.currentSrc || image.src;
      previewImage.alt = image.alt || 'Evidence image';
      caption.textContent = image.alt || 'Evidence image';

      lightbox.showModal();
      closeButton.focus();
    };

    const makePreviewable = (target, image) => {
      target.classList.add('is-previewable');
      target.tabIndex = 0;
      target.setAttribute('role', 'button');
      target.setAttribute('aria-label', `Preview image: ${image.alt || 'evidence image'}`);
      target.addEventListener('click', () => openPreview(image));
      target.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPreview(image);
        }
      });
    };

    [...content.querySelectorAll('img')].forEach((image) => {
      const filename = new URL(image.src, window.location.href).pathname.split('/').pop();
      const cropAspect = phoneCrops[filename];

      if (cropAspect) {
        image.dataset.cropAspect = cropAspect;
        const frame = document.createElement('span');
        frame.className = 'evidence-phone-frame';
        frame.style.setProperty('--phone-crop-aspect', cropAspect);
        image.replaceWith(frame);
        frame.appendChild(image);
        makePreviewable(frame, image);
      } else {
        makePreviewable(image, image);
      }
    });

    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  const searchDialog = document.getElementById('search-dialog');
  const searchOpenButton = document.getElementById('open-search');
  const searchCloseButton = document.getElementById('close-search');
  const searchInput = document.getElementById('site-search');
  const searchStatus = document.getElementById('search-status');
  const searchResults = document.getElementById('search-results');

  if (searchDialog && searchInput && searchStatus && searchResults) {
    let posts = [];
    let indexPromise;

    const loadIndex = () => {
      if (!indexPromise) {
        indexPromise = fetch(searchInput.dataset.indexUrl)
          .then((response) => {
            if (!response.ok) throw new Error('Search index unavailable');
            return response.json();
          })
          .then((data) => {
            posts = data;
            return posts;
          });
      }
      return indexPromise;
    };

    const renderResults = (query) => {
      const normalizedQuery = query.trim().toLowerCase();
      const terms = normalizedQuery.split(/\s+/).filter(Boolean);

      searchResults.replaceChildren();
      if (!terms.length) {
        searchStatus.textContent = 'Start typing to search the archive.';
        return;
      }

      const matches = posts.filter((post) => {
        const haystack = [post.title, post.description, post.category, post.tags, post.content]
          .join(' ')
          .toLowerCase();
        return terms.every((term) => haystack.includes(term));
      });

      searchStatus.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for “${query.trim()}”`;

      matches.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'search-result';

        const link = document.createElement('a');
        link.href = post.url;

        const meta = document.createElement('div');
        meta.className = 'post-card__meta';
        meta.textContent = `${post.category} · ${post.date} · ${post.readingTime}`;

        const title = document.createElement('h2');
        title.textContent = post.title;

        const description = document.createElement('p');
        description.textContent = post.description;

        link.append(meta, title, description);
        article.appendChild(link);
        searchResults.appendChild(article);
      });

      if (!matches.length) {
        const empty = document.createElement('p');
        empty.className = 'search-empty';
        empty.textContent = 'No matching writeups yet. Try a broader term.';
        searchResults.appendChild(empty);
      }
    };

    const openSearch = (query = '') => {
      if (!searchDialog.open) searchDialog.showModal();
      searchInput.value = query;
      searchStatus.textContent = 'Loading the archive…';
      searchResults.replaceChildren();
      loadIndex()
        .then(() => renderResults(query))
        .catch(() => {
          searchStatus.textContent = 'Search is temporarily unavailable.';
        });
      window.requestAnimationFrame(() => searchInput.focus());
    };

    searchOpenButton?.addEventListener('click', () => openSearch());
    searchCloseButton?.addEventListener('click', () => searchDialog.close());
    searchInput.addEventListener('input', () => renderResults(searchInput.value));

    searchDialog.addEventListener('click', (event) => {
      if (event.target === searchDialog) searchDialog.close();
    });

    document.addEventListener('click', (event) => {
      const topic = event.target.closest('[data-search-query]');
      if (!topic) return;
      event.preventDefault();
      openSearch(topic.dataset.searchQuery || '');
    });

    document.addEventListener('keydown', (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
      if ((event.key === '/' && !isTyping) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        openSearch();
      }
    });

    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) openSearch(initialQuery);
  }

  const viewCount = document.querySelector('[data-view-count]');
  if (viewCount) {
    const code = viewCount.dataset.goatcounterCode;
    const path = window.location.pathname;
    const endpoint = `https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error('View count unavailable');
        return response.json();
      })
      .then(({ count }) => {
        if (!count) return;
        viewCount.textContent = `${count} ${count === '1' ? 'view' : 'views'}`;
        viewCount.hidden = false;
        document.querySelector('.post-meta__view-separator')?.removeAttribute('hidden');
      })
      .catch(() => {
        // Keep the optional counter hidden until GoatCounter has data for this page.
      });
  }

  const mermaidBlocks = [...document.querySelectorAll('pre code.language-mermaid')];
  if (mermaidBlocks.length) {
    mermaidBlocks.forEach((block) => {
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.textContent = block.textContent;
      block.closest('pre').replaceWith(container);
    });

    import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: true,
          theme: 'dark',
          securityLevel: 'strict',
          themeVariables: {
            primaryColor: '#172023',
            primaryTextColor: '#dfe7e4',
            primaryBorderColor: '#69ff94',
            lineColor: '#8f9c98',
            secondaryColor: '#111719',
            tertiaryColor: '#0b0f10'
          }
        });
        mermaid.run({ querySelector: '.mermaid' });
      })
      .catch(() => {
        document.querySelectorAll('.mermaid').forEach((diagram) => {
          diagram.classList.add('mermaid-fallback');
        });
      });
  }
})();

