package Web_NoiThat.Util;

public class UploadFileModel {
	private String fileName;
	private String base64;
	private String root;
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getBase64() {
		return base64;
	}

	public void setBase64(String base64) {
		this.base64 = base64;
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}

	public UploadFileModel() {
		super();
	}

	public UploadFileModel(String fileName, String base64, String root) {
		super();
		this.fileName = fileName;
		this.base64 = base64;
		this.root = root;
	}
	
}
