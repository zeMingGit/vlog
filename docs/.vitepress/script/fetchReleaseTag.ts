export const fetchReleaseTag = () => {
  return fetch('https://api.github.com/repos/2439340964/vlog/releases/latest')
    .then((res) => res.json())
    .then((json) => json.tag_name ?? '')
    .then(releaseTag => {
      if (!releaseTag) return;
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const docsReleaseTagSpan = document.createElement('samp')
      docsReleaseTagSpan.classList.add('docs-cn-github-release-tag')
      docsReleaseTagSpan.innerText = releaseTag
      tagLineParagragh?.appendChild(docsReleaseTagSpan)
    })
}
