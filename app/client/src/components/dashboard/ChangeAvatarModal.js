import PropTypes from "prop-types";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Cropper from "react-cropper";
import { connect } from "react-redux";

import { updateAvatar } from "../../actions/profile";

import "cropperjs/dist/cropper.css";

const defaultSrc = "favicon-196x196.png";

const ChangeAvatarModal = ({ show, onHide, updateAvatar }) => {
	const [image, setImage] = useState(defaultSrc);
	const [cropper, setCropper] = useState();

	const onChange = (e) => {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(files[0]);
	};

	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			cropper
				.getCroppedCanvas({
					width: 96,
					height: 96,
					minWidth: 96,
					minHeight: 96,
					maxWidth: 96,
					maxHeight: 96,
				})
				.toBlob((blob) => {
					const formData = new FormData();
					const fileName = localStorage.token + Date.now();
					formData.append("imageFile", blob, fileName + ".png");
					updateAvatar(formData);
				});
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="modal-for-changing-avatar"
			centered>
			<Modal.Header closeButton>
				<Modal.Title>Change your avatar</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row noGutters>
					<Col xs={12} sm={12} md={4} lg={2}>
						<span id="change-avatar-label">Upload a photo </span>
					</Col>
					<Col xs={12} sm={12} md={8} lg={10}>
						<input
							type="file"
							onChange={onChange}
							accept="image/*"
						/>
					</Col>
				</Row>
				<br />
				<Cropper
					zoomTo={1}
					aspectRatio={1}
					src={image}
					viewMode={1}
					guides={true}
					minCropBoxHeight={96}
					minCropBoxWidth={96}
					background={false}
					responsive={true}
					autoCropArea={1}
					checkOrientation={false}
					onInitialized={(instance) => {
						setCropper(instance);
					}}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						getCropData();
						onHide();
					}}>
					Upload
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

ChangeAvatarModal.propTypes = {
	updateAvatar: PropTypes.func,
};

export default connect(null, { updateAvatar })(ChangeAvatarModal);
