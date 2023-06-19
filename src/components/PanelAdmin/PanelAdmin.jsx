export default function PanelAdmin() {
	return (
		<div className="container mt-5 pt-5">
			<div className="row justify-content-center">
				<div className="col-md-4">
					<a href="/admin/clients" className="btn btn-light btn-block mb-3">
						<img
							src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.entrepreneur.com%2Fcontent%2F3x2%2F2000%2F1606145100-GettyImages-912803226.jpg&f=1&nofb=1&ipt=83d5dd5a0e213b72c0853b028ac22ce0c20f77a536c46dfbb3dab32f5153e9e5&ipo=images"
							alt="clients"
							className="img-fluid"
						/>
						Clients
					</a>
				</div>
				<div className="col-md-4">
					<a href="/admin/books" className="btn btn-light btn-block mb-3">
						<img
							src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-Zslk3dNXp4E%2FVmXHfVC6UAI%2FAAAAAAAAA1U%2FVcVOe6TClbg%2Fs1600%2FOld%252Bbooks.jpg&f=1&nofb=1&ipt=360b8b812fbfa9270ade7459789ca4e6bf4c5766400a06600200aed53fbeb8c9&ipo=images"
							alt="livres"
							className="img-fluid"
						/>
						Livres
					</a>
				</div>
				<div className="col-md-4">
					<a href="/admin/indexes" className="btn btn-light btn-block mb-3">
						<img
							src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thebluediamondgallery.com%2Fhandwriting%2Fimages%2Findex.jpg&f=1&nofb=1&ipt=895a5a415c8059a24cbbfce6f7442dcbc3e7d98fe0be52fde5c3716632c5db89&ipo=images"
							alt="indexation"
							className="img-fluid"
						/>
						Indexation
					</a>
				</div>
			</div>
		</div>
	);

}
