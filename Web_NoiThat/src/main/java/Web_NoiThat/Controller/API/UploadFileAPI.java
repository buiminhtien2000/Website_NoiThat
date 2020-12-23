package Web_NoiThat.Controller.API;

import java.util.Base64;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import Web_NoiThat.Util.UploadFileModel;
import Web_NoiThat.Util.UploadFileUtils;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "UploadFileAPI")
public class UploadFileAPI {
	@RequestMapping(value = "/api/uploadFile", method = RequestMethod.POST)
	public void updateFile(@RequestBody UploadFileModel fileUpload) {
		byte[] decodeBase64 = Base64.getDecoder().decode(fileUpload.getBase64().getBytes());
		UploadFileUtils.writeOrUpdate(decodeBase64, fileUpload.getFileName() ,fileUpload.getRoot());
	}
}
