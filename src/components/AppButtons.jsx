import { Button, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import {BsGooglePlay} from "react-icons/bs";
import {AiFillApple} from "react-icons/ai";

// interface StoreButtonProps extends ButtonProps {
//   icon: React.ComponentType; 
//   label: string;
//   storeLink: string; 
// }

const StoreButton = ({ icon, label, storeLink, ...props }) => {
  return (
    <Button 
      leftIcon={<Icon as={icon} />} 
      variant="outline" 
      {...props} 
      size="lg"
      borderWidth="2px"
      colorScheme="black"
      onClick={() => window.open(storeLink, "_blank")}
    >
      {label}
    </Button>
  );
}

const AppButtons = () => {
  return (
    <HStack spacing={4} mt={8}>
      <StoreButton 
        icon={BsGooglePlay} 
        label="Google Play" 
        storeLink="https://play.google.com/store/apps/details?id=com.consumerug&hl=en&gl=US" 
      />
      <StoreButton 
        icon={AiFillApple} 
        label="App Store" 
        storeLink="https://apps.apple.com/ng/app/mtn-momo/id1474080783" 
      />
    </HStack>
  );
};

export default AppButtons;

