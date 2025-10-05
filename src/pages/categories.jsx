import { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'
import noImage from '../assets/no-photo.jpg'
import useCategories from '../hooks/useCategories'

const Categories = () => {
	const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user

	// Format currency to Uzbek so'm
	const {
		categories,
		meta,
		loading: categoriesLoading,
		error: categoriesError,
	} = useCategories(tgUser?.id, 1, 10)

	const [cat, setCat] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	// Kategoriyalar yuklanganda birinchi kategoriya active bo'ladi
	useEffect(() => {
		if (categories && categories.length > 0) {
			setCat(
				categories.map((c, index) => ({
					...c,
					active: index === 0,
				}))
			)
		}
	}, [categories])

	// Filter categories based on search term
	const filteredCategories = cat.filter(category =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCategoryClick = id => {
		const selectedCategory = filteredCategories.find(c => c.Id === id)

		// ✅ LocalStorage ga saqlash
		localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory))

		// ✅ Faqat bitta category active bo'lishi uchun
		setCat(prev =>
			prev.map(c => ({
				...c,
				active: c.Id === selectedCategory.Id,
			}))
		)
	}

	return (
		<div className='px-2 mb-40 mt-24'>
			<div className='flex items-center md:max-w-lg border justify-between p-2 rounded-xl px-5 mb-6'>
				<input
					type='text'
					placeholder='Qidiruv...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='text-lg w-full outline-none px-3 bg-transparent text-gray-800 placeholder-gray-500 focus:border-[rgb(22,113,98)] focus:ring-0 dark:text-white'
				/>
				<IoMdSearch className='text-2xl' />
			</div>
			<div className='mb-5 px-2'>
				<h2 className='text-2xl font-semibold h-8 max-h-8'>Kategoriyalar</h2>
			</div>
			<div className='grid grid-cols-3 sm:grid-cols-4 justify-around gap-4'>
				{filteredCategories.map(c => (
					<div
						key={c.Id}
						onClick={() => handleCategoryClick(c.Id)}
						className={`cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
							c.active
								? 'text-[rgb(22,113,98)] dark:text-white'
								: 'text-gray-800 dark:text-gray-500'
						}`}
					>
						<div
							className={`w-24 h-24 rounded-xl flex items-center justify-center mb-2 shadow-md overflow-hidden border-2 transition-all ${
								c.active
									? 'border-green-500 bg-gray-800 dark:border-white'
									: 'border-transparent bg-gray-100 dark:bg-gray-800'
							}`}
						>
							<img
								src={c.imageUrl || noImage}
								alt={c.title}
								className='w-full h-full object-cover'
							/>
						</div>
						<p className='text-sm font-medium h-[40px] max-h-[40px] overflow-auto'>
							{c.name.length > 20 ? c.name.slice(0, 30) + '...' : c.name}
						</p>
					</div>
				))}
			</div>

			<div className='w-full fixed bottom-2 right-0 left-0 flex items-center gap-2 px-4'>
				<Link
					to={'/shop'}
					className='flex-1 bg-[rgb(22,113,98)] w-full text-center py-2 text-white rounded-md '
				>
					Tanlash
				</Link>
				<Link
					to={'/'}
					className='flex-1 bg-gray-500 w-full text-center py-2 text-white rounded-md '
				>
					Orqaga
				</Link>
			</div>
		</div>
	)
}

export default Categories
