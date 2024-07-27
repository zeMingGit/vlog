export const fetchReleaseTag = () => {
  return fetch('https://api.github.com/repos/zeMingGit/vlog/releases/latest')
    .then((res) => res.json())
    .then((json) => json.tag_name ?? '')
    .then(releaseTag => {
      if (!releaseTag) return
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const sampDoc = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline > .docs-cn-github-release-tag')
      const docsReleaseTagSpan = document.createElement('samp')
      docsReleaseTagSpan.classList.add('docs-cn-github-release-tag')
      docsReleaseTagSpan.innerText = releaseTag
      !sampDoc && tagLineParagragh?.appendChild(docsReleaseTagSpan)
    })
}

export const fetchReleaseTagArray = () => {
  return fetch('https://api.github.com/repos/zeMingGit/vlog/releases/latest')
    .then((res) => res.json())
    // .then((json) => json.tag_name ?? '')
    .then(releaseTag => {
      return releaseTag
    })
}
