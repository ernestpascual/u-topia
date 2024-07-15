"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useReadContract,
} from "wagmi";

import donationABI from "../abi/donationAbi.json";
import { ChangeEvent, useState } from "react";
import { formatEther, parseEther } from "viem";

function App() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContract } = useWriteContract();
  const [donationAmount, setDonationAmount] = useState("");

  const [isConnected, setIsConnected] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const { data: donatedAmount } = useReadContract({
    address: "0x6Df5D14b042EEbA6954663221eadB8cfb609EF37",
    abi: donationABI,
    functionName: "donationInfo",
    args: [account.address],
  });

  const { data: totalDonations } = useReadContract({
    address: "0x6Df5D14b042EEbA6954663221eadB8cfb609EF37",
    abi: donationABI,
    functionName: "totalDonation",
  });

  const handleChangeDonation = (event: ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div>
        <h1 className="text-9xl bold animate-pulse py-[100px]">ETH DONATOR</h1>

        {!isConnected && (
          <div className="flex flex-col items-center">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setIsConnected(true);
                }}
                type="button"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-5 px-6 rounded"
              >
                Connect to {connector.name}
              </button>
            ))}
          </div>
        )}
        <br />

        {account.status === "connected" && isConnected && (
          <div className="flex flex-col items-center">
            <div>
              {" "}
              <b>Connected Address:</b> {account.address}{" "}
            </div>
            <div>
              <b>Total Donation:</b>{" "}
              {formatEther(totalDonations?.toString() || "0")} ETH
            </div>
            <h3>
              <b>Total User Donation:</b> :{" "}
              {formatEther(donatedAmount?.toString() || "0")} ETH
            </h3>
            <br />
            <input
              type="text"
              id="small-input"
              className="block w-75 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChangeDonation}
              value={donationAmount}
              placeholder="ETH TO DONATE"
            />
            <br />
            <div>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mr-[10px]"
                onClick={() => {
                  writeContract({
                    address: "0x6Df5D14b042EEbA6954663221eadB8cfb609EF37",
                    abi: donationABI,
                    functionName: "receiveDonation",
                    value: parseEther(donationAmount),
                  });
                  setIsUpdated(false);
                  setIsUpdated(true);
                }}
              >
                donate
              </button>

              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded"
                onClick={() => {
                  setIsConnected(false);
                  disconnect();
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
