export function scrollLock() {
    document.body.classList.add('overflow-hidden');
}

export function releaseScroll() {
    document.body.classList.remove('overflow-hidden');
}
