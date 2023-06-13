
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ClientList() {
	const clients = [
		{
			firstName: 'Jeff',
			lastName: 'Van Der Doele',
			email: 'jeff@mail.com',
		},
		{
			firstName: 'Raul',
			lastName: 'Vamonos',
			email: 'raul@mail.com',
		},
		{
			firstName: 'Sofia',
			lastName: 'Ben Belamni',
			email: 'sofia@mail.com',
		},
	];
	return (
		<table>
			<thead>
				<tr>
					<th>Prénom</th>
					<th>Nom</th>
					<th>Mail</th>
					<th></th>
					<th>
						<AddCircleIcon />
					</th>
				</tr>
			</thead>
			<tbody>
				{clients.map((element, index) => {
					return (
						<tr key={element + '-' + index}>
							<td key={element.firstName + '-' + index}>
								{element.firstName}
							</td>
							<td key={element.lastName + '-' + index}>
								{element.lastName}
							</td>
							<td key={element.email + '-' + index}>
								{element.email}
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
