type RevealOptions = {
	delay?: number;
	once?: boolean;
	threshold?: number;
	rootMargin?: string;
};

const DEFAULT_OPTIONS: Required<RevealOptions> = {
	delay: 0,
	once: true,
	threshold: 0.15,
	rootMargin: '0px 0px -10% 0px'
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	let settings = { ...DEFAULT_OPTIONS, ...options };
	const prefersReducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	node.setAttribute('data-reveal', '');
	node.style.setProperty('--reveal-delay', `${settings.delay}ms`);

	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		node.setAttribute('data-reveal-visible', 'true');
		return {
			update(nextOptions: RevealOptions = {}) {
				const next = { ...DEFAULT_OPTIONS, ...nextOptions };
				node.style.setProperty('--reveal-delay', `${next.delay}ms`);
			},
			destroy() {}
		};
	}

	let observer = createObserver(settings);
	observer.observe(node);

	function createObserver(observerOptions: Required<RevealOptions>) {
		return new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;

					node.setAttribute('data-reveal-visible', 'true');
					if (observerOptions.once) {
						observer.unobserve(node);
					}
				}
			},
			{
				threshold: observerOptions.threshold,
				rootMargin: observerOptions.rootMargin
			}
		);
	}

	return {
		update(nextOptions: RevealOptions = {}) {
			const next = { ...DEFAULT_OPTIONS, ...nextOptions };
			node.style.setProperty('--reveal-delay', `${next.delay}ms`);

			if (next.threshold !== settings.threshold || next.rootMargin !== settings.rootMargin) {
				observer.disconnect();
				observer = createObserver(next);
				observer.observe(node);
			}
			settings = next;
		},
		destroy() {
			observer.disconnect();
		}
	};
}
