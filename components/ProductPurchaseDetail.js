import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const {width} = Dimensions.get('window');

const ProductPurchaseDetail = () => {
  const [liked, setLiked] = useState(false);

const [activeAccordion, setActiveAccordion] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const {post} = route.params;

const toggleAccordion = (section) => {
  LayoutAnimation.easeInEaseOut();
  setActiveAccordion(prev => (prev === section ? null : section));
};


  const images = [{uri: post.image_url}];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Product Details</Text>
          {/* <Icon name="more-vert" size={22} color="#000" /> */}
        </View>

        {/* Image Swiper */}
        <View style={styles.imageWrapper}>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(_, index) => index.toString()}
            onScroll={e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(index);
            }}
            renderItem={({item}) => (
              <Image source={{uri: item.uri}} style={styles.productImage} />
            )}
          />
          {/* Dot Indicators */}
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Title Row */}
        <View style={styles.titleRow}>
          <Text style={styles.productName}>{post.product_name}</Text>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Icon
              name={liked ? 'favorite' : 'favorite-border'}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.productPrice}>₹{post.selling_price}</Text>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.sectionText}>{post.description}</Text>
        </View>

        {/* Expandable Specs */}
   {/* Accordion 1 */}
<TouchableOpacity style={styles.accordionHeader} onPress={() => toggleAccordion('spec1')}>
  <Text style={styles.accordionTitle}>Company Policies</Text>
  <Icon name={activeAccordion === 'spec1' ? 'expand-less' : 'expand-more'} size={24} />
</TouchableOpacity>
{activeAccordion === 'spec1' && (
<Text style={styles.accordionContent}>
  When purchasing a product through our platform, a <Text style={styles.highlight}>5% platform fee</Text> is added to the listed price.{"\n\n"}
  This fee helps support the platform’s maintenance and operations.{"\n\n"}
  The total payable amount will include the product price + <Text style={styles.highlight}>5% platform fee</Text>.
</Text>


)}

{/* Accordion 3 */}
<TouchableOpacity style={styles.accordionHeader} onPress={() => toggleAccordion('spec3')}>
  <Text style={styles.accordionTitle}>Usage & Safety Policy</Text>
  <Icon name={activeAccordion === 'spec3' ? 'expand-less' : 'expand-more'} size={24} />
</TouchableOpacity>
{activeAccordion === 'spec3' && (
<Text style={styles.accordionContent}>
  Please read all <Text style={styles.highlight}>instructions</Text> before using the product.{"\n\n"}
  <Text style={styles.highlight}>AllenInside is not responsible</Text> for any misuse of the product.{"\n\n"}
  Avoid exposure to <Text style={styles.highlight}>water or fire</Text> unless clearly stated safe.{"\n\n"}
  For best performance, always follow the <Text style={styles.highlight}>product manual</Text>.
</Text>

)}

      </ScrollView>

      {/* Bottom Bar */}
     <TouchableOpacity
  onPress={() => navigation.navigate('PurchaseForm', { post })}
  style={styles.payButton}
>
  <Text style={styles.payText}>Pay & Buy</Text>
</TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop:30,
    backgroundColor:'#007bff',
  },
  headerTitle: {fontSize: 16, fontWeight: '600',color:'#fff'},
  imageWrapper: {
    marginTop: 8,
    height: 220,
    position: 'relative',
  },
  highlight: {
  fontWeight: 'bold',
  color: '#007bff',
},

  productImage: {
   width: width,
  height: 220,
  resizeMode: 'contain', // image pura dikhega bina cut ke
  backgroundColor: '#fff', // optional: white background if image doesn't cover full area
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3D5CFF',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 15,
  },
  section: {paddingHorizontal: 16, marginTop: 10},
  sectionTitle: {fontWeight: '700', fontSize: 15, marginBottom: 6},
  sectionText: {color: '#444', fontSize: 14},
  accordionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {fontSize: 15, fontWeight: '600'},
 accordionContent: {
  backgroundColor: '#ffffff',
  paddingVertical: 14,
  paddingHorizontal: 18,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderColor: '#e0e0e0',
  borderWidth: 1,
  borderTopWidth: 0,
  fontSize: 14,
  color: '#444',
  lineHeight: 22,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  discountText: {color: 'green', fontWeight: 'bold', marginBottom: 2},
  finalPrice: {fontSize: 20, fontWeight: 'bold', color: '#000'},
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 8,
  },
  priceBreak: {fontSize: 12, color: '#3D5CFF', marginTop: 4},
  payButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 14,
  },
  payText: {color: '#fff', fontWeight: '600', fontSize: 26,
    alignItems:'center', alignSelf:"center",
  },
});

export default ProductPurchaseDetail;




