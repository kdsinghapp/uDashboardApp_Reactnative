
import StatusBarComponent from '../compoent/StatusBarCompoent';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../assets/imageIndex';
import CustomHeader from '../compoent/CustomHeader';
import { color } from '../constant';
import { endpointCustomer } from '../Api/endpoints';
import { GetApi } from '../Api/apiRequest';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LoadingModal from '../utils/Loader';
// import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
 const isLogin = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false)
  const [callbackData, setCallbackData] = useState([])
  const [searchText, setSearchText] = useState("")
  const nav = useNavigation()
  useEffect(() => {
    fetchCallback();
  }, []);

  const filteredData = callbackData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      item?.task_name?.toLowerCase().includes(query)
      //  item?.status?.name?.toLowerCase().includes(query) ||
      //   item?.priority?.name?.toLowerCase().includes(query)
    );
  });
  const fetchCallback = async () => {
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.GetPlanList
    }
    const data = await GetApi(param, setLoading)
    setCallbackData(data?.data)
  }
  const plans = {
    basic: {
      name: 'Basic',
      price: billingCycle === 'annual' ? '$59.99/year' : '$6.99/month',
      originalPrice: billingCycle === 'annual' ? '$83.88' : null,
      features: [
        'Access to basic content',
        'Standard video quality',
        'Limited downloads',
        'Basic support'
      ],
      popular: false
    },
    premium: {
      name: 'Premium',
      price: billingCycle === 'annual' ? '$99.99/year' : '$12.99/month',
      originalPrice: billingCycle === 'annual' ? '$155.88' : null,
      features: [
        'All basic features',
        'HD video quality',
        'Unlimited downloads',
        'Priority support',
        'Offline access',
        'Early access to new content'
      ],
      popular: true
    },
    family: {
      name: 'Family',
      price: billingCycle === 'annual' ? '$149.99/year' : '$19.99/month',
      originalPrice: billingCycle === 'annual' ? '$239.88' : null,
      features: [
        'All premium features',
        'Up to 6 family members',
        'Individual profiles',
        'Parental controls',
        'Simultaneous streaming',
        '24/7 premium support'
      ],
      popular: false
    }
  };

  return (
     <SafeAreaView edges={['top']} style={{
      flex: 1,
      backgroundColor: "white"
    }}>
        {loading && <LoadingModal/>}
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12
      }}>
       <CustomHeader/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Membership Plans</Text>
          {/* <Text style={styles.subtitle}>
            Select the perfect plan for your needs
          </Text> */}
        </View>

        {/* Billing Toggle */}
        {/* <View style={styles.billingToggleContainer}>
          <Text style={styles.billingLabel}>Monthly</Text>
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setBillingCycle(
              billingCycle === 'monthly' ? 'annual' : 'monthly'
            )}
          >
            <View style={[
              styles.toggleTrack,
              billingCycle === 'annual' && styles.toggleTrackActive
            ]}>
              <View style={[
                styles.toggleThumb,
                billingCycle === 'annual' && styles.toggleThumbActive
              ]} />
            </View>
          </TouchableOpacity>
          <View style={styles.annualContainer}>
            <Text style={styles.billingLabel}>Annual</Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveText}>Save 20%</Text>
            </View>
          </View>
        </View> */}

        {/* Pricing Cards */}
        <View style={styles.cardsContainer}>
          {Object.entries(callbackData).map(([key, plan]) => (
            <PricingCard
              key={key}
              plan={plan}
              isSelected={selectedPlan === key}
              onSelect={() => setSelectedPlan(key)}
              billingCycle={billingCycle}
            />
          ))}
        </View>

        {/* Features Comparison */}
        {/* <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Plan Comparison</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureRow}>
              <Text style={styles.featureName}>Video Quality</Text>
              <Text style={styles.featureValue}>SD</Text>
              <Text style={styles.featureValue}>HD</Text>
              <Text style={styles.featureValue}>4K</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureName}>Simultaneous Streams</Text>
              <Text style={styles.featureValue}>1</Text>
              <Text style={styles.featureValue}>3</Text>
              <Text style={styles.featureValue}>6</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureName}>Offline Downloads</Text>
              <Text style={styles.featureValue}>✓</Text>
              <Text style={styles.featureValue}>✓</Text>
              <Text style={styles.featureValue}>✓</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureName}>Family Sharing</Text>
              <Text style={styles.featureValue}>-</Text>
              <Text style={styles.featureValue}>-</Text>
              <Text style={styles.featureValue}>✓</Text>
            </View>
          </View>
        </View> */}

        {/* CTA Button */}
        {/* <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>
            Get {plans[selectedPlan].name} Plan
          </Text>
        </TouchableOpacity> */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔒 Your payment is secure and encrypted. Cancel anytime.
          </Text>
        </View>
      </ScrollView>
      </View>
      </SafeAreaView>
  );
};

const PricingCard = ({ plan, isSelected, onSelect, billingCycle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        plan.popular && styles.cardPopular
      ]}
      onPress={onSelect}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{plan.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$ {plan.price}</Text>
          {plan.description && (
            <Text style={styles.originalPrice}>{plan.description}</Text>
          )}
        </View>

        <View style={styles.featuresList}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              {/* <Ionicons name="checkmark-circle" size={20} color="#4CAF50" /> */}
              <Image source={{uri:"https://img.icons8.com/?size=80&id=sX1TdNYIFMJ4&format=png"}} style={{height:20, width:20, tintColor:'#4CAF50'}} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={[
          styles.selectButton,
          isSelected && styles.selectButtonSelected
        ]}>
          <Text style={[
            styles.selectButtonText,
            isSelected && styles.selectButtonTextSelected
          ]}>
            {isSelected ? 'Selected' : 'Select Plan'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    // alignItems: 'center',
    // padding: 20,
    // paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  billingToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  billingLabel: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  toggle: {
    marginHorizontal: 10,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 25,
    backgroundColor: '#ddd',
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: color.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  annualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 5,
  },
  saveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: 10,
    paddingVertical:20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderColor: color.primary,
    transform: [{ scale: 1.02 }],
  },
  cardPopular: {
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: color.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    // textDecorationLine: 'line-through',
    marginTop: 4,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  selectButton: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectButtonSelected: {
    backgroundColor: color.primary,
  },
  selectButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectButtonTextSelected: {
    color: 'white',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresGrid: {
    // Add grid styles for feature comparison
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  featureName: {
    flex: 2,
    color: '#666',
  },
  featureValue: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: color.primary,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PricingPage;