
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function BookList() {
	const books = [
		{
			title: 'Livre A',
			author: 'Auteur A',
			summary: 'un résumé',
			coverPage: 'url',
			price: '2,00€',
		},
		{
			title: 'Livre B',
			author: 'Auteur B',
			summary: 'un résumé',
			coverPage: 'url',
			price: '2,00€',
		},
		{
			title: 'Livre C',
			author: 'Auteur C',
			summary: 'un résumé',
			coverPage: 'url',
			price: '2,00€',
		},
	];
	return (
		<table>
			<thead>
				<tr>
					<th>Titre</th>
					<th>Auteur</th>
					<th>Résumé</th>
					<th>Image</th>
					<th>Prix</th>
					<th></th>
					<th>
						<AddCircleIcon />
					</th>
				</tr>
			</thead>
			<tbody>
				{books.map((element, index) => {
					return (
						<tr key={element + '-' + index}>
							<td key={element.title + '-' + index}>
								{element.title}
							</td>
							<td key={element.author + '-' + index}>
								{element.author}
							</td>
							<td key={element.summary + '-' + index}>
								{element.summary}
							</td>
							<td key={element.coverPage + '-' + index}>
								{element.coverPage}
							</td>
							<td key={element.price + '-' + index}>
								{element.price}
							</td>
							<td key={'update-' + index}>
								<EditIcon />
							</td>
							<td key={'delete-' + index}>
								<DeleteIcon />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
