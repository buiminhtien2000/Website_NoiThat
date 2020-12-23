package Web_NoiThat.Util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.commons.lang.StringUtils;

public class UploadFileUtils {
	public static void writeOrUpdate(byte[] bytes, String path ,String root) {
		File file = new File(root);
		FileOutputStream fileOutputStream = null;
		if(!file.exists()) {
			file.mkdir();
		}
		try {
			fileOutputStream = new FileOutputStream(new File(root + path));
			fileOutputStream.write(bytes);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				if(fileOutputStream!=null) {
					fileOutputStream.close();
				}
			} catch (IOException e2) {
				e2.printStackTrace();
			}
		}
	}
}
