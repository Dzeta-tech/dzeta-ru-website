<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components';
	import { reveal } from '$lib/actions/reveal';

	const projectTypes = [
		{ value: '', label: 'Выберите тип проекта' },
		{ value: 'web', label: 'Веб-приложение' },
		{ value: 'mobile', label: 'Мобильное приложение' },
		{ value: 'telegram', label: 'Telegram Mini App' },
		{ value: 'crm', label: 'CRM / Платформа' },
		{ value: 'other', label: 'Другое' }
	];

	const projectStageOptions = [
		{ value: '', label: 'У вас новый проект или существующий?' },
		{ value: 'new', label: 'Новый проект' },
		{ value: 'existing', label: 'Существующий проект' }
	];

	let contact = $state('');
	let projectType = $state('');
	let projectStage = $state('');
	let openDropdown = $state<'projectType' | 'projectStage' | null>(null);
	let projectTypeDropdownEl = $state<HTMLElement | null>(null);
	let projectStageDropdownEl = $state<HTMLElement | null>(null);

	function getOptionLabel(options: { value: string; label: string }[], value: string) {
		return options.find((opt) => opt.value === value)?.label ?? options[0].label;
	}

	function toggleDropdown(name: 'projectType' | 'projectStage') {
		openDropdown = openDropdown === name ? null : name;
	}

	function chooseProjectType(value: string) {
		projectType = value;
		openDropdown = null;
	}

	function chooseProjectStage(value: string) {
		projectStage = value;
		openDropdown = null;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		// TODO: submit to backend
	}

	onMount(() => {
		const handlePointerDown = (event: Event) => {
			const target = event.target as Node | null;
			if (!target) return;

			const clickedType = projectTypeDropdownEl?.contains(target) ?? false;
			const clickedStage = projectStageDropdownEl?.contains(target) ?? false;
			if (!clickedType && !clickedStage) {
				openDropdown = null;
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				openDropdown = null;
			}
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleEscape);
		};
	});
</script>

<section
	id="contact"
	class="scroll-mt-16 bg-[var(--color-section-alt)] py-16 md:py-24"
	aria-labelledby="contact-heading"
>
	<div class="px-4 sm:px-6 lg:px-8">
		<h2
			id="contact-heading"
			class="text-style-h1 mb-[10px] text-[var(--color-paragraph-1)]"
			use:reveal={{ delay: 0 }}
		>
			Давайте обсудим ваш проект
		</h2>
		<p class="text-style-p2 mb-[10px] text-[var(--color-paragraph-1)]" use:reveal={{ delay: 80 }}>
			Перед началом работы мы просим вас ответить на пару вопросов.
		</p>
		<p class="text-style-p2 mb-[30px] text-[var(--color-paragraph-1)]" use:reveal={{ delay: 110 }}>
			Ваши ответы — лучшая заявка для нас. На их основе мы поймем, чем сможем быть полезны: соберём
			информацию и подготовимся ко встрече.
		</p>
		<div class="mb-[30px]" use:reveal={{ delay: 140 }}>
			<p class="text-style-p2 text-[var(--color-paragraph-2)]">
				Оставьте контакт для связи с менеджером 
			</p>
			<p class="text-style-p2 text-[var(--color-paragraph-1)]">
				и заполните бриф
			</p>
		</div>

		<form class="contact-form flex flex-col gap-[10px] md:gap-6" onsubmit={handleSubmit}>
			<div class="flex flex-col gap-[10px] md:gap-[20px]" use:reveal={{ delay: 180 }}>
				<label for="contact-field" class="text-style-p2 text-[var(--color-paragraph-2)]">
					Как с вами связаться?
				</label>
				<input
					id="contact-field"
					type="text"
					bind:value={contact}
					placeholder="Укажите свой email или телеграм"
					class="contact-input h-12 w-full rounded-full border border-[#8d8d8d] bg-transparent px-5 text-style-p1 text-[var(--color-paragraph-1)] caret-[var(--color-paragraph-1)] placeholder:text-[#8d8d8d] focus:border-[#d2d2d2] focus:placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#d2d2d2]"
					autocomplete="email"
				/>
			</div>

			<div class="contact-dropdown-row grid gap-[10px] sm:grid-cols-2 sm:gap-4" use:reveal={{ delay: 240 }}>
				<div class="contact-dropdown" class:is-open={openDropdown === 'projectType'} bind:this={projectTypeDropdownEl}>
					<label for="project-type-button" class="sr-only">Тип проекта</label>
					<button
						id="project-type-button"
						type="button"
						class="contact-dropdown-trigger text-style-p1"
						aria-haspopup="listbox"
						aria-expanded={openDropdown === 'projectType'}
						aria-controls="project-type-listbox"
						onclick={() => toggleDropdown('projectType')}
					>
						<span class:contact-dropdown-placeholder={!projectType}>
							{getOptionLabel(projectTypes, projectType)}
						</span>
						<svg
							class:contact-dropdown-chevron-open={openDropdown === 'projectType'}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#8d8d8d" />
						</svg>
					</button>
					<input type="hidden" name="projectType" value={projectType} />

					{#if openDropdown === 'projectType'}
						<ul id="project-type-listbox" class="contact-dropdown-menu" role="listbox">
							{#each projectTypes as opt}
								<li>
									<button
										type="button"
										class="contact-dropdown-option text-style-p1"
										class:is-selected={projectType === opt.value}
										role="option"
										aria-selected={projectType === opt.value}
										onclick={() => chooseProjectType(opt.value)}
									>
										{opt.label}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
				<div class="contact-dropdown" class:is-open={openDropdown === 'projectStage'} bind:this={projectStageDropdownEl}>
					<label for="project-stage-button" class="sr-only">Новый или существующий проект</label>
					<button
						id="project-stage-button"
						type="button"
						class="contact-dropdown-trigger text-style-p1"
						aria-haspopup="listbox"
						aria-expanded={openDropdown === 'projectStage'}
						aria-controls="project-stage-listbox"
						onclick={() => toggleDropdown('projectStage')}
					>
						<span class:contact-dropdown-placeholder={!projectStage}>
							{getOptionLabel(projectStageOptions, projectStage)}
						</span>
						<svg
							class:contact-dropdown-chevron-open={openDropdown === 'projectStage'}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#8d8d8d" />
						</svg>
					</button>
					<input type="hidden" name="projectStage" value={projectStage} />

					{#if openDropdown === 'projectStage'}
						<ul id="project-stage-listbox" class="contact-dropdown-menu" role="listbox">
							{#each projectStageOptions as opt}
								<li>
									<button
										type="button"
										class="contact-dropdown-option text-style-p1"
										class:is-selected={projectStage === opt.value}
										role="option"
										aria-selected={projectStage === opt.value}
										onclick={() => chooseProjectStage(opt.value)}
									>
										{opt.label}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<div use:reveal={{ delay: 300 }}>
				<Button type="submit" variant="disabled" class="w-fit">
					Отправить заявку
				</Button>
			</div>

			<p class="text-style-p2 text-[#8d8d8d] mt-[10px]" use:reveal={{ delay: 340 }}>
				Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с
				политикой конфиденциальности
			</p>
		</form>
	</div>
</section>

<style>
	.contact-form {
		isolation: isolate;
	}

	.contact-dropdown-row {
		position: relative;
		z-index: 120;
	}

	.contact-dropdown {
		position: relative;
		z-index: 50;
	}

	.contact-dropdown.is-open {
		z-index: 60;
	}

	.contact-dropdown-trigger {
		width: 100%;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		border-radius: 999px;
		border: 1px solid #8d8d8d;
		background: transparent;
		padding: 0 1rem 0 1.25rem;
		color: var(--color-paragraph-1);
		text-align: left;
		outline: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.contact-dropdown-trigger:focus-visible {
		border-color: #d2d2d2;
		box-shadow: 0 0 0 1px #d2d2d2;
	}

	.contact-dropdown-placeholder {
		color: #8d8d8d;
	}

	.contact-dropdown-trigger svg {
		flex-shrink: 0;
		transition: transform 0.25s ease;
	}

	.contact-dropdown-chevron-open {
		transform: rotate(180deg);
	}

	.contact-dropdown-menu {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(100% + 0.5rem);
		z-index: 70;
		max-height: 16rem;
		overflow-y: auto;
		border-radius: 1rem;
		border: 1px solid #d9d9d9;
		background: #f5f5f5;
		padding: 0.4rem;
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
		z-index: 100;
	}

	.contact-dropdown-option {
		width: 100%;
		display: block;
		text-align: left;
		border: 0;
		border-radius: 0.75rem;
		background: transparent;
		color: #141415;
		padding: 0.65rem 0.75rem;
		cursor: pointer;
		transition: background-color 0.15s ease;
		z-index: 100;
	}

	.contact-dropdown-option:hover {
		background: #e7e7e8;
	}

	.contact-dropdown-option.is-selected {
		background: #1f1f20;
		color: #ffffff;
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-dropdown-trigger,
		.contact-dropdown-trigger svg,
		.contact-dropdown-option {
			transition: none;
		}
	}
</style>
