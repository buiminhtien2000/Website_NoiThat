package Web_NoiThat.Controller.API;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Web_NoiThat.Bean.ProductDetail;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "ProductDetailAPI")
public class ProductDetailAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_productDetail",method = RequestMethod.POST)
	public ProductDetail createProductDetail(@RequestBody ProductDetail productDetail){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.save(productDetail);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		return productDetail;
	}
	@RequestMapping(value = "/api/manager_productDetail",method = RequestMethod.PUT)
	public void updateProductDetail(@RequestParam("id") int id,
            @RequestBody ProductDetail productDetails){
		Session s = factory.getCurrentSession();
		ProductDetail productDetail = (ProductDetail) s.get(ProductDetail.class,id);
		productDetail.setColor(productDetails.getColor());
		productDetail.setMaterial(productDetails.getMaterial());
		productDetail.setSize(productDetails.getSize());
		productDetail.setTrademark(productDetails.getTrademark());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(productDetail);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/manager_productDetail",method = RequestMethod.DELETE)
	public void deleteProduct(@RequestParam("id") int id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			Session s = factory.getCurrentSession();
			ProductDetail productDetail = (ProductDetail) s.get(ProductDetail.class, id);
			session.delete(productDetail);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectProductDetailByID", method = RequestMethod.GET)
	public ResponseEntity<List<ProductDetail>> findById(@RequestParam("idProduct") int idProduct) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM ProductDetail WHERE idProduct = :idProduct";
		Query query = session.createQuery(hql);
		query.setParameter("idProduct", idProduct);
		List<ProductDetail> listProductDetail = query.list();
		if(listProductDetail == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<ProductDetail>>(listProductDetail, HttpStatus.OK);
	}
}
