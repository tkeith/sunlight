import { ExclamationIcon } from '@heroicons/react/solid'

export default function WalletNotConnectedWarning() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Connect your wallet</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Use the button above to connect your crypto wallet and interact with the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
