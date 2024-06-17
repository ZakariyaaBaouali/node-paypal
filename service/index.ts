import axios from "axios";
import { PAYPAL_BASE_URI, PAYPAL_CLIENT_ID, PAYPAL_SECRET_ID } from "../config";

//🚀🚀
//destract token from data
interface IToken {
  access_token: string;
  expires_in: number;
}

//payplay
interface IPaypalPayload {
  intent: string;
  purchase_units: [
    {
      //items
      items: [
        {
          name: string;
          description: string;
          quantity: string;
          unit_amount: {
            currency_code: string;
            value: string;
          };
        }
      ];

      //amount
      amount: {
        currency_code: string;
        value: string;
        breakdown?: {
          item_total: {
            currency_code: string;
            value: string;
          };
        };
      };
    }
  ];
  application_context: {
    return_url: string;
    cancel_url: string;
    shipping_preference?: string;
    user_action?: string;
  };
}

interface IPaypalLinks {
  id: string;
  links: [
    {
      href: string;
      rel: string;
    }
  ];
}

interface PaymentResult {
  status: string;
  payment_source: {
    paypal: {
      email_address: string;
      name: {
        given_name: string;
        surname: string;
      };
    };
  };
  purchase_units: {
    shipping: {
      address: {
        address_line_1: string;
        admin_area_1: string;
        admin_area_2: string;
        postal_code: string;
        country_code: string;
      };
    };
    payments: {
      captures: {
        eller_receivable_breakdown: {
          gross_amount: {
            currency_code: string;
            value: string;
          };
          paypal_fee: {
            currency_code: string;
            value: string;
          };
          net_amount: {
            currency_code: string;
            value: string;
          };
        };
      };
    };
  };
}

const data: IPaypalPayload = {
  intent: "CAPTURE",
  purchase_units: [
    {
      items: [
        {
          name: "T-Shirt",
          description: "Green XL",
          quantity: "1",
          unit_amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
      amount: {
        currency_code: "USD",
        value: "100.00",
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      },
    },
  ],
  application_context: {
    return_url: "http://localhost:3002/paypal/complete",
    cancel_url: "http://localhost:3002/paypal/cancel",
    user_action: "PAY_NOW",
  },
};

export class PaypalService {
  //🚀🚀
  constructor() {}

  //🚀🚀
  public async generatePaypalToken(): Promise<string | null> {
    const url = `${PAYPAL_BASE_URI}/v1/oauth2/token`;
    const res = await axios({
      url,
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_ID,
      },
    });
    if (res) {
      const { access_token, expires_in } = res.data as IToken;
      return access_token;
    }
    return null;
  }

  //🚀🚀
  public async payPaypal() {
    const access_token = await this.generatePaypalToken();
    //
    if (access_token) {
      const url = `${PAYPAL_BASE_URI}/v2/checkout/orders`;
      const res = await axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: JSON.stringify(data),
      });
      if (res) {
        const data = res.data as IPaypalLinks;
        const pay_url = data.links.filter((link) => link.rel === "approve")[0]
          .href;
        return pay_url;
      }
    }
    return null;
  }

  //🚀🚀
  public async getPaypalPaymentDetails(order_id: string) {
    //
    const access_token = await this.generatePaypalToken();

    //
    if (access_token) {
      const url = `${PAYPAL_BASE_URI}/v2/checkout/orders/${order_id}/capture`;
      const res = await axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (res) {
        const data = res.data as PaymentResult;
        return data;
      }
    }
    return null;
  }
}
