export {};

declare global {
    interface Window {
      kakao: any;
    }
    
    namespace kakao {
      namespace maps {
        class Map {}
      }
    }
}