<script lang="ts">
	import { Button } from '$lib/components';

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

	function handleSubmit(e: Event) {
		e.preventDefault();
		// TODO: submit to backend
	}
</script>

<section
	id="contact"
	class="scroll-mt-16 bg-[var(--color-section-alt)] py-16 md:py-24"
	aria-labelledby="contact-heading"
>
	<div class="px-4 sm:px-6 lg:px-8">
		<h2 id="contact-heading" class="text-[64px] mb-[10px] line-height-[1.1] font-sans text-[var(--color-paragraph-1)]">
			Давайте обсудим ваш проект
		</h2>
		<p class="text-style-p2 mb-[30px] text-[var(--color-paragraph-1)]">
			Перед началом работы мы просим вас ответить на пару вопросов. Ваши ответы — лучшая заявка
			для нас. На их основе мы поймем, чем сможем быть полезны: соберём информацию и подготовимся ко встрече.
		</p>
		<span class="flex mb-[30px] gap-1">
			<p class="text-style-p2 text-[var(--color-paragraph-2)]">
				Оставьте контакт для связи с менеджером 
			</p>
			<p class="text-style-p2 text-[var(--color-paragraph-1)]">
				и заполните бриф
			</p>
		</span>

		<form class="flex flex-col gap-6" onsubmit={handleSubmit}>
			<div class="flex flex-col gap-[20px]">
				<label for="contact-field" class="text-style-p2 text-[var(--color-paragraph-2)]">
					Как с вами связаться?
				</label>
				<input
					id="contact-field"
					type="text"
					bind:value={contact}
					placeholder="Укажите свой email или телеграм"
					class="contact-input h-12 w-full rounded-full border border-[#8d8d8d] bg-transparent px-5 text-style-p1 text-[#f2f2f2] placeholder:text-[#8d8d8d] focus:border-[#d2d2d2] focus:outline-none focus:ring-1 focus:ring-[#d2d2d2]"
					autocomplete="email"
				/>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="project-type" class="sr-only">Тип проекта</label>
					<select
						id="project-type"
						bind:value={projectType}
						class="contact-select h-12 w-full appearance-none rounded-full border border-[#8d8d8d] bg-transparent px-5 pr-10 text-style-p1 text-[#d6d6d6] focus:border-[#d2d2d2] focus:outline-none focus:ring-1 focus:ring-[#d2d2d2]"
					>
						{#each projectTypes as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="project-stage" class="sr-only">Новый или существующий проект</label>
					<select
						id="project-stage"
						bind:value={projectStage}
						class="contact-select h-12 w-full appearance-none rounded-full border border-[#8d8d8d] bg-transparent px-5 pr-10 text-style-p1 text-[#d6d6d6] focus:border-[#d2d2d2] focus:outline-none focus:ring-1 focus:ring-[#d2d2d2]"
					>
						{#each projectStageOptions as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<Button type="submit" variant='disabled' class='w-fit'>
				Отправить заявку
			</Button>

			<p class="text-style-p2 text-[#8d8d8d]">
				Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с
				политикой конфиденциальности
			</p>
		</form>
	</div>
</section>

<style>
	.contact-select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z' fill='%238d8d8d'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
	}
</style>
